package com.social_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social_backend.config.JwtProvider;
import com.social_backend.models.User;
import com.social_backend.repository.UserRepository;
import com.social_backend.requests.LoginRequest;
import com.social_backend.response.AuthResponse;
import com.social_backend.service.CustomUserDetailService;
import com.social_backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private JwtProvider JwtProvider;

    // to add an entry
	@PostMapping("/signup")
	public AuthResponse createUser(@RequestBody User user) throws Exception {
        User doesExist = userRepository.findByEmail(user.getEmail());
        if(doesExist != null) {
            throw new Exception("User already exists");
        }
        User newUser = new User();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
		
        String token = com.social_backend.config.JwtProvider.generateToken(authentication);

        AuthResponse res = new AuthResponse(token, "User registered successfully");
        return res;
		

	}

    @PostMapping("/signin")
    public AuthResponse signin(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        String token = com.social_backend.config.JwtProvider.generateToken(authentication);
        System.out.println(loginRequest.getPassword());
        AuthResponse res = new AuthResponse(token, "User Logged in successfully");
        return res;
    }

    
 
    private Authentication authenticate(String email, String password) {
        // Log the email for debugging purposes
        System.out.println("Attempting authentication for user: " + email);
        
        UserDetails userDetails = customUserDetailService.loadUserByUsername(email);
        if(userDetails == null) {
            throw new BadCredentialsException("User not found");
        }

        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Password is incorrect");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    /**
     * Logout endpoint
     * : This is a wildcard in Java generics. 
     * It means that the type of the response body is not specified or is flexible (could be any type or even no content).
     * @return
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok().body("Logged out successfully");
    }
    
}

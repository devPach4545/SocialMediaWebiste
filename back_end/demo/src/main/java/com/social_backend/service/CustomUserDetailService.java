

package com.social_backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.social_backend.models.User;
import com.social_backend.repository.UserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	// This method is used by Spring Security to retrieve user details based on the username (in this case, the email).
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

	    // The 'username' parameter is expected to be the user's email address.
	    // Retrieve the user from the database using the provided email.
	    User user = userRepository.findByEmail(username);

	    // If no user is found with the provided email, throw an exception to indicate the user was not found.
	    if (user == null) {
	        throw new UsernameNotFoundException("User not found with email " + username);
	    }

	    // Create a list of authorities (roles or permissions) for the user.
	    // In this example, no authorities are being assigned. You can add roles or permissions if needed.
	    List<GrantedAuthority> authorities = new ArrayList<>();
	    
	    // Return a UserDetails implementation with the user's email, password, and authorities.
	    // Spring Security will use this information to authenticate and authorize the user.
	    return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
	}

	
}
	

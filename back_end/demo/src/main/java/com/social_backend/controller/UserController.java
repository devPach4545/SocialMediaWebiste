package com.social_backend.controller;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import com.social_backend.config.JwtProvider;
import com.social_backend.exceptions.UserException;
import com.social_backend.models.User;
import com.social_backend.repository.UserRepository;
import com.social_backend.service.UserService;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@GetMapping("/api/users")
	public List<User> getUsers() {

		/*
		 * List<User> users = new ArrayList<>();
		 * User user1 = new User(1,"dev", "pach", "email", "abcd");
		 * User user2 = new User(2,"dev", "pach2", "email2", "abcd3");
		 * users.add(user1);
		 * users.add(user2);
		 * return users;
		 */

		List<User> users = userRepository.findAll();
		return users;
	}

	@GetMapping("/api/users/{userID}")
	public User getUsersbyID(@PathVariable("userID") Integer id) throws UserException  {
		/*
		 * User user = new User(1,"dev", "pach", "email", "abcd");
		 * user.setID(id);
		 * return user;
		 */
		return userService.findUserById(id);

	}

	@PutMapping("/api/users")
	public User updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User user) throws UserException {

		User reqUser = userService.findUserbyJwt(jwt);
		User updatedUser = userService.updateUser(user, reqUser.getId());
		return updatedUser;

	}

	@PutMapping("/api/users/follow/{userId2}")
	public User followUserHandler(@RequestHeader("Authorization") String jwt, @PathVariable Integer userId2) throws UserException {
		User reqUser = userService.findUserbyJwt(jwt);
		User updatedUser = userService.followUser(reqUser.getId(), userId2);
		return updatedUser;
	}

	@GetMapping("/api/users/search")
	public List<User> searchUser(@RequestParam("query") String query) {
		List<User> users = userService.searchUser(query);
		return users;
	}

	@GetMapping("/api/users/profile")
	public User getUserFromToken(@RequestHeader("Authorization") String jwt) {
		User user = userService.findUserbyJwt(jwt);
		user.setPassword(null);
		return user;
	}

}

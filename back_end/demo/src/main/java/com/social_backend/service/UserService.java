package com.social_backend.service;

import java.util.List;

import com.social_backend.exceptions.UserException;
import com.social_backend.models.User;

public interface UserService {
	public User registerUser(User user);
	
	
	public User findUserById(Integer userId) throws UserException;
	
	public User findUserbyEmail(String email);
	
	public User followUser(Integer userId1, Integer userId2) throws UserException;
	
	public User updateUser(User user, Integer id) throws UserException;
	
	public List<User> searchUser(String query);

	public User findUserbyJwt(String jwt);
	
}

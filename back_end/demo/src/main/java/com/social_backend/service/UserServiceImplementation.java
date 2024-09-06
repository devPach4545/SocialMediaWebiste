package com.social_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social_backend.config.JwtProvider;
import com.social_backend.exceptions.UserException;
import com.social_backend.models.User;
import com.social_backend.repository.UserRepository;

// will write all the business logic here

@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public User registerUser(User user) {
		User newUser = new User();
		newUser.setEmail(user.getEmail());
		newUser.setFirstName(user.getFirstName());
		newUser.setLastName(user.getLastName());
		newUser.setPassword(user.getPassword());
		newUser.setID(user.getId());

		User savedUser = userRepository.save(newUser);
		return savedUser;
	}

	@Override
	public User findUserById(Integer userId) throws UserException {
		Optional<User> user = userRepository.findById(userId);

		if (user.isPresent()) {
			return user.get();
		} else {
			throw new UserException("no user with userid " + userId);
		}
	}

	@Override
	public User findUserbyEmail(String email) {
		User user = userRepository.findByEmail(email);
		return user;
	}

	@Override
	public User followUser(Integer reqUserId, Integer userId2) throws UserException {
		// user 1 follows user 2
		User reqUser, user2;
		if (reqUserId != null) {
			reqUser = findUserById(reqUserId);
		} else {
			throw new UserException("No user with userid " + reqUserId);
		}
		if (userId2 != null) {
			user2 = findUserById(userId2);
		} else {
			throw new UserException("No user with userid " + userId2);
		}
		user2.getFollowers().add(reqUser.getId());
		reqUser.getFollowing().add(user2.getId());

		userRepository.save(reqUser);
		userRepository.save(user2);

		return reqUser;
	}

	@Override
	public User updateUser(User user, Integer id) throws UserException {
		Optional<User> user1 = userRepository.findById(id);

		if (user1.isEmpty()) {
			throw new UserException("No user with userid " + id);
		} else {

			User oldUser = user1.get();
			if (user.getFirstName() != null) {
				oldUser.setFirstName(user.getFirstName());
			}
			if (user.getLastName() != null) {
				oldUser.setLastName(user.getLastName());
			}
			if (user.getEmail() != null) {
				oldUser.setEmail(user.getEmail());
			}
			if(user.getGender() != null) {
				oldUser.setGender(user.getGender());
			}

			User newUser = userRepository.save(oldUser);

			return newUser;
		}
	}

	@Override
	public List<User> searchUser(String query) {
		return userRepository.searchUser(query);

	}

	@Override
	public User findUserbyJwt(String jwt) {
		String email = JwtProvider.getEmailFromJwtToken(jwt);
		User user = userRepository.findByEmail(email);
		return user;
	}

}

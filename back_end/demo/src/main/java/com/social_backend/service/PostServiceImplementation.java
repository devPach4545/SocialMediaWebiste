package com.social_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social_backend.models.Post;
import com.social_backend.models.User;
import com.social_backend.repository.PostRepository;
import com.social_backend.repository.UserRepository;

@Service
public class PostServiceImplementation implements PostService {

	@Autowired
	PostRepository postRepository;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public Post createNewPost(Post post, Integer userId) throws Exception {
		
		
		Post newPost = new Post();
		newPost.setCaption(post.getCaption());
		newPost.setImage(post.getImage());
		newPost.setVideo(post.getVideo());
		newPost.setCreatedAt(LocalDateTime.now());
		newPost.setUser(userService.findUserById(userId));

		
		return postRepository.save(newPost);
	}

	@Override
	public String deletePost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(post.getUser().getId() != user.getId()) {
			throw new Exception("you cannot delete someone elses post");
		}
		postRepository.delete(post);
		return "post deleted succesfully";
	}

	@Override
	public List<Post> findPostByUserId(Integer userId) {
		return postRepository.findPostByUserId(userId);
		
	}

	@Override
	public Post findPostById(Integer postId) throws Exception {
		Optional<Post> options = postRepository.findById(postId);
		if(options.isEmpty()) {
			throw new Exception("Post not found with id: " + postId);
		}
		return options.get();
		
	}

	@Override
	public List<Post> findAllPost() {
		// TODO Auto-generated method stub
		return postRepository.findAll();
	}

	@Override
	public Post savedPost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(user.getSavedPosts().contains(post)) {
			user.getSavedPosts().remove(post);
		}
		else {
			user.getSavedPosts().add(post);
			
		}
		userRepository.save(user);
		return post;
	}

	@Override
	public Post likePost(Integer postId, Integer userId) throws Exception {
		Post post = findPostById(postId);
		User user = userService.findUserById(userId);
		
		if(post.getLikedPosts().contains(user)) {
			post.getLikedPosts().remove(user);
		}
		else {
			post.getLikedPosts().add(user);
		}
		
		return postRepository.save(post);
	}

}

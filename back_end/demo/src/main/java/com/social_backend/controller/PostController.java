package com.social_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.social_backend.models.Post;
import com.social_backend.models.User;
import com.social_backend.response.ApiResponse;
import com.social_backend.service.PostService;
import com.social_backend.service.UserService;

@RestController
public class PostController {
	
	@Autowired
	PostService postService;

	@Autowired
	UserService userService;
	
	// user with userId creates the post object
	@PostMapping("/api/posts")
	public ResponseEntity<Post> createPost(@RequestHeader("Authorization") String jwt, @RequestBody Post post) throws Exception{
		User user = userService.findUserbyJwt(jwt);
		

		Post createdPost = postService.createNewPost(post, user.getId());
		return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping("/api/posts/{postId}")
	public ResponseEntity<ApiResponse> deletePost(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception{
		User reqUser = userService.findUserbyJwt(jwt);
		String message = postService.deletePost(postId, reqUser.getId());
		ApiResponse response = new ApiResponse(message, true);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.OK);
	}
	
	@GetMapping("/api/posts/{postId}")
	public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws Exception{
		Post post = postService.findPostById(postId);
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/api/posts/user/{userId}")
	public ResponseEntity<List<Post>> findPostWithUserId(@PathVariable Integer userId) throws Exception{
		List<Post> userPost = postService.findPostByUserId(userId);
		return new ResponseEntity<List<Post>>(userPost, HttpStatus.OK);
	}
	
	@GetMapping("/api/posts")
	public ResponseEntity<List<Post>> findPosts() throws Exception{
		List<Post> allPost = postService.findAllPost();
		return new ResponseEntity<List<Post>>(allPost, HttpStatus.OK);
	}
	
	@PutMapping("/api/posts/save/{postId}")
	public ResponseEntity<Post> savedPostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserbyJwt(jwt);
		Post post = postService.savedPost(postId, user.getId());
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/api/posts/like/{postId}")
	public ResponseEntity<Post> likedPostHandler(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserbyJwt(jwt);
		Post post = postService.likePost(postId, user.getId());
		return new ResponseEntity<Post>(post, HttpStatus.ACCEPTED);
	}
}

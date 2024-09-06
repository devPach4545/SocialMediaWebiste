package com.social_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.social_backend.models.Post;


// need this to manipulate the data from the database
public interface PostRepository extends JpaRepository<Post, Integer> {
	
	// The @Query annotation allows us to define a custom JPQL query.
	// This query retrieves all Post entities (p) from the POST table where the associated
	// user's ID (p.user.id) matches the userId passed as a method parameter.
	// I have this because i will find the post with the particular user id and delete it, since jpa 
	// does not have an inbuilt findpostbyuserID i have to make this method
	
	@Query("SELECT p FROM Post p WHERE p.user.id=:userId")
	List<Post> findPostByUserId(Integer userId);
}

package com.social_backend.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

// it maps the database to the model, the entity tag
@Entity
public class Post {
	
	// generates an id automatically
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Integer id;
	private String Caption;
	private String image;
	private String video;
	// define what is the relationship between post and user
	// multiple post => one user meaning one user can have multiple posts
	// to avoid the recursion problem
	
	@ManyToOne
	private User user;
	
	// one post => multiple users can like, 
	@ManyToMany
	private List<User> likedPosts = new ArrayList<>();
	
	private LocalDateTime createdAt;
	

	@OneToMany
	private List<Comment> comments = new ArrayList<>();

	

	public Post() {
		
	}

	

	public Post(Integer id, String caption, String image, String video, User user, List<User> likedPosts,
			LocalDateTime createdAt, List<Comment> comments) {
		super();
		this.id = id;
		Caption = caption;
		this.image = image;
		this.video = video;
		this.user = user;
		this.likedPosts = likedPosts;
		this.createdAt = createdAt;
		this.comments = comments;
	}



	public List<User> getLikedPosts() {
		return likedPosts;
	}



	public void setLikedPosts(List<User> likedPosts) {
		this.likedPosts = likedPosts;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCaption() {
		return Caption;
	}

	public void setCaption(String caption) {
		Caption = caption;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}



	public List<Comment> getComments() {
		return comments;
	}



	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

}

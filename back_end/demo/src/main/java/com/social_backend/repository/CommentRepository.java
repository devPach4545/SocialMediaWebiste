package com.social_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.social_backend.models.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    
    
}

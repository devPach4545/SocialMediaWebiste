package com.social_backend.service;

import com.social_backend.models.Comment;

public interface CommentService {
    
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception;

    public String deleteComment(Integer userId, Integer postId, Integer commentId) throws Exception;

    public Comment likeComment(Integer commentId, Integer userId) throws Exception;

    public Comment findCommentById(Integer commentId) throws Exception;
}

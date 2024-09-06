package com.social_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.social_backend.models.Comment;
import com.social_backend.models.User;
import com.social_backend.service.CommentService;
import com.social_backend.service.UserService;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/comments/post/{postId}")
    public Comment createComment(@RequestBody Comment comment, @RequestHeader("Authorization") String jwt,
            @PathVariable("postId") Integer postId) throws Exception {

        User user = userService.findUserbyJwt(jwt);

        Comment newComment = commentService.createComment(comment, postId, user.getId());

        return newComment;
    }

    @PutMapping("/api/comments/like/{commentId}")
    public Comment likeComment(@RequestHeader("Authorization") String jwt,
            @PathVariable Integer commentId) throws Exception {

        User user = userService.findUserbyJwt(jwt);

        Comment likedComment = commentService.likeComment(commentId, user.getId());

        return likedComment;
    }

    @DeleteMapping("/api/posts/{postId}/comments/{commentId}")
    public void deleteComment(@RequestHeader("Authorization") String jwt, @PathVariable Integer postId,
            @PathVariable Integer commentId) throws Exception {

        User user = userService.findUserbyJwt(jwt);

        commentService.deleteComment(user.getId(), postId, commentId);

    }

}

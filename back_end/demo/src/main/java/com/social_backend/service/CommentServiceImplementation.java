package com.social_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.social_backend.models.Comment;
import com.social_backend.models.Post;
import com.social_backend.models.User;
import com.social_backend.repository.CommentRepository;
import com.social_backend.repository.PostRepository;
import java.time.LocalDateTime;
import java.util.Optional;


@Service
public class CommentServiceImplementation implements CommentService{

    @Autowired
    private CommentRepository commentRepository; 

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;


    @Autowired
    private PostRepository postRepository;


    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws Exception {
        User user = userService.findUserById(userId);

        Post post = postService.findPostById(postId);

        comment.setUser(user);
        comment.setContent(comment.getContent());
        comment.setCreatedAt(LocalDateTime.now());
        
        Comment savedComment = commentRepository.save(comment);
        
        post.getComments().add(savedComment);
        postRepository.save(post);
        
        return savedComment;
    }

    

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws Exception {
        
        User user = userService.findUserById(userId);
        Comment comment = findCommentById(commentId);
        if(comment.getLiked().contains(user)){
            comment.getLiked().remove(user);
        }else{
            comment.getLiked().add(user);
        }
        return commentRepository.save(comment);
    }

    @Override
    public Comment findCommentById(Integer commentId) throws Exception {
        Optional<Comment> opt = commentRepository.findById(commentId);
        if(opt.isEmpty()){
            throw new Exception("Comment not found");
        }
        return opt.get();
    }



    @Override
    public String deleteComment(Integer userId, Integer postId, Integer commentId) throws Exception {
        Comment comment = findCommentById(commentId);
        if(comment.getUser().getId() != userId){
            throw new Exception("You are not authorized to delete this comment");
        }

        // Get the post that the comment belongs to
        Post post = postService.findPostById(postId);
        
        if(post.getId() != postId){
            throw new Exception("The comment does not belong to the post");
        }

        

        // Remove the comment from the post
        post.getComments().remove(comment);

        // Save the post
        postRepository.save(post);

        // Delete the comment
        commentRepository.delete(comment);

        return "Comment deleted successfully";



    }


    
}

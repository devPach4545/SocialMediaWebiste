package com.social_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.social_backend.models.Chat;
import com.social_backend.models.User;
import com.social_backend.requests.ChatRequest;
import com.social_backend.service.ChatService;
import com.social_backend.service.UserService;

@RestController
public class ChatController {
    
    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/chats")
    public Chat createChat(@RequestHeader("Authorization") String jwt, @RequestBody ChatRequest chatRequest) throws Exception {
        User loggedInUser = userService.findUserbyJwt(jwt);
        User otherUser = userService.findUserById(chatRequest.getUserId());
        return chatService.createChat(loggedInUser, otherUser);
    }

    @GetMapping("/api/chats")
    public List<Chat> findChatForOneUser(@RequestHeader("Authorization") String jwt) {
        User user = userService.findUserbyJwt(jwt);
        return chatService.findALLChatForUser(user.getId());
    }
}

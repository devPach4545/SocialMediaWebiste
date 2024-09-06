package com.social_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.social_backend.models.Message;
import com.social_backend.models.User;
import com.social_backend.service.MessageService;
import com.social_backend.service.UserService;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/messages/chat/{chatId}")
    public Message createMessage(@RequestHeader("Authorization") String jwt,
            @RequestBody Message msg,
            @PathVariable Integer chatId) throws Exception {
        User user = userService.findUserbyJwt(jwt);

        Message newMessage = messageService.createMessage(user, chatId, msg);
        return newMessage;
    }

    @GetMapping("/api/messages/chat/{chatId}")
    public List<Message> getMessagesFromChat(@PathVariable Integer chatId) throws Exception {
        List<Message> msgList = messageService.getMessagesFromChatId(chatId);
        return msgList;
    }

}

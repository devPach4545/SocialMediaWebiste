package com.social_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.social_backend.models.Message;

@Controller
public class RealTimeChatController {
    // define from which endpoint the message will be sent
    // and to which endpoint the message will be sent
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{groupId}")
    public Message sendToUser(@Payload Message message,
    @DestinationVariable String groupId){

        simpMessagingTemplate.convertAndSendToUser(groupId,"/private",message);
        return message;
    }
}

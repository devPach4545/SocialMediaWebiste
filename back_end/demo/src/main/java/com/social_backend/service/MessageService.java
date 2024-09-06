package com.social_backend.service;

import java.util.List;

import com.social_backend.models.Chat;
import com.social_backend.models.Message;
import com.social_backend.models.User;

public interface MessageService {
    
    /**
     * Create a message from userId and chatId
     * And use msg to extract the message i.e the content and image
     * @param userId
     * @param chatId
     * @param chat
     * @return
     * @throws Exception 
     */
    public Message createMessage(User user, Integer chatId, Message msg) throws Exception;

    /**
     * Get all messages from chatId
     * @param chatId
     * @return
     * @throws Exception 
     */
    public List<Message> getMessagesFromChatId(Integer chatId) throws Exception;
}

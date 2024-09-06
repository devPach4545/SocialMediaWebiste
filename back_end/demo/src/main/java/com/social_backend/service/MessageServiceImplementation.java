package com.social_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.social_backend.models.Chat;
import com.social_backend.models.Message;
import com.social_backend.models.User;
import com.social_backend.repository.ChatRepository;
import com.social_backend.repository.MessageRepository;

@Service
public class MessageServiceImplementation implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatService  chatService;

    @Autowired
    private ChatRepository  chatRepository;

    

    @Override
    public Message createMessage(User user, Integer chatId, Message msg) throws Exception{
        
        Chat chat = chatService.findChatById(chatId);
        Message newMessage = new Message();
        newMessage.setMessage(msg.getMessage());
        newMessage.setImage(msg.getImage());
        newMessage.setUser(user);
        newMessage.setChat(chat);
        newMessage.setCreatedAt(LocalDateTime.now());
        Message savedMessage = messageRepository.save(newMessage);
        
        // Note: this is important because it updates the chat with the new message
        chat.getMessages().add(savedMessage);
        chatRepository.save(chat);
        return savedMessage;
         
    }

    @Override
    public List<Message> getMessagesFromChatId(Integer chatId) throws Exception{
        return messageRepository.findByChatId(chatId);
    }
    
}

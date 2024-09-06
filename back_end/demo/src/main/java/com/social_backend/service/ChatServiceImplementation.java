package com.social_backend.service;

import com.social_backend.models.Chat;
import com.social_backend.models.User;
import com.social_backend.repository.ChatRepository;

import java.util.List;
import java.time.LocalDateTime;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImplementation implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserService userService;

    public Chat createChat(User loggedInUser, User otherUser) {

        Chat doExist = chatRepository.findChatById(otherUser, loggedInUser);
        if (doExist != null) {
            return doExist;
        }

        Chat chat = new Chat();
        chat.getUsers().add(loggedInUser);
        chat.getUsers().add(otherUser);
        chat.setCreatedAt(LocalDateTime.now());
        return chatRepository.save(chat);
    }

    public Chat findChatById(Integer chatId) {

        Optional<Chat> opt = chatRepository.findById(chatId);
        if (opt.isPresent()) {
            return opt.get();
        }
        return null;
    }

    public List<Chat> findALLChatForUser(Integer userId) {
        return chatRepository.findByUsersId(userId);
    }

}

package com.social_backend.service;

import java.util.List;
import com.social_backend.models.Chat;
import com.social_backend.models.User;

public interface ChatService {
    
    public Chat createChat(User loggedInUser, User otherUser);

    public Chat findChatById(Integer chatId);

    public List<Chat> findALLChatForUser(Integer userId);


    
}

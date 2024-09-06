package com.social_backend.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.social_backend.models.Chat;
import com.social_backend.models.User;

/**
 * The ChatRepository interface provides methods to interact with the Chat entity in the database.
 */
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    
    /**
     * Finds all chats associated with a specific user.
     * 
     * @param userId The ID of the user.
     * @return A list of Chat objects associated with the user.
     */
    public List<Chat> findByUsersId(Integer userId);

    /**
     * Finds a chat by the given user and logged-in user.
     * 
     * @param user The user to search for in the chat.
     * @param loggedInUser The logged-in user to search for in the chat.
     * @return The Chat object that matches the given user and logged-in user.
     */
    @Query("SELECT c FROM Chat c WHERE :user MEMBER OF c.users AND :loggedInUser MEMBER OF c.users")
    public Chat findChatById(@Param("user") User user, @Param("loggedInUser") User loggedInUser);
}

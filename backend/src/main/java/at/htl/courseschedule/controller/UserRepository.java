package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.User;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

@ApplicationScoped
public class UserRepository {
    public User getOrCreateUser(UUID uuid) {
        User user = User.findById(uuid);
        return user == null ? createUser(uuid) : user;
    }

    private User createUser(UUID uuid) {
        User user = new User(uuid);
        User.persist(user);
        return user;
    }
}

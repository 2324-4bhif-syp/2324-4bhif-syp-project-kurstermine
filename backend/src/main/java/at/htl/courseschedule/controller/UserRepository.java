package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<User, UUID> {
    public User getOrCreateUser(UUID uuid) {
        User user = User.findById(uuid);
        return user == null ? createUser(uuid) : user;
    }

    private User createUser(UUID uuid) {
        return getEntityManager().merge(new User(uuid));
    }
}

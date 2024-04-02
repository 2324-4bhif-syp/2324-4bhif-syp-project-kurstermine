package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.BabyUser;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

@ApplicationScoped
public class UserRepository {
    public BabyUser getOrCreateUser(UUID uuid) {
        BabyUser user = BabyUser.findById(uuid);
        return user == null ? createUser(uuid) : user;
    }

    private BabyUser createUser(UUID uuid) {
        BabyUser user = new BabyUser(uuid);
        BabyUser.persist(user);
        return user;
    }
}

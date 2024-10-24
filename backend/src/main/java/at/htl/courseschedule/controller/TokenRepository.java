package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Token;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

@ApplicationScoped
public class TokenRepository implements PanacheRepositoryBase<Token, UUID> {
}

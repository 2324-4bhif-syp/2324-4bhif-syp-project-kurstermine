package at.htl.courseschedule.controller;

import at.htl.courseschedule.dto.TokenDto;
import at.htl.courseschedule.entity.Token;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class TokenRepository implements PanacheRepositoryBase<Token, UUID> {

    @Inject
    CategoryRepository categoryRepository;

    @Inject
    UserRepository userRepository;

    public List<Token> createTokens(int number, TokenDto tokenDto) {
        List<Token> tokens = new ArrayList<>();

        for (int i = 0; i < number; i++) {
            Token token = new Token();
            token.setCategory(categoryRepository.findById(tokenDto.categoryId()));
            token.setUser(userRepository.getOrCreateUser(tokenDto.userId()));
            tokens.add(token);

            persist(token);
        }

        return tokens;
    }
}

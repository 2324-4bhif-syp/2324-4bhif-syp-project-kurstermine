package at.htl.courseschedule.controller;

import at.htl.courseschedule.boundary.Role;
import at.htl.courseschedule.dto.TokenDto;
import at.htl.courseschedule.entity.Appointment;
import at.htl.courseschedule.entity.Category;
import at.htl.courseschedule.entity.Token;
import at.htl.courseschedule.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.keycloak.representations.idm.UserRepresentation;

@ApplicationScoped
public class TokenRepository implements PanacheRepositoryBase<Token, UUID> {

    @Inject
    CategoryRepository categoryRepository;

    @Inject
    UserRepository userRepository;

    @Inject
    AppointmentRepository appointmentRepository;

    @Inject
    MailService mailService;

    @Inject
    KeycloakUserRepository keycloakUserRepository;

    @Inject
    JsonWebToken jsonWebToken;

    public List<Token> createTokens(int amount, TokenDto tokenDto) {
        List<Token> tokens = new ArrayList<>();

        Category category = categoryRepository.findById(tokenDto.categoryId());
        User user = userRepository.getOrCreateUser(tokenDto.userId());

        for (int i = 0; i < amount; i++) {
            Token token = new Token();
            token.setCategory(category);
            token.setUser(user);
            tokens.add(token);

            persist(token);
        }

        UserRepresentation customer = keycloakUserRepository.getById(
            UUID.fromString(jsonWebToken.getClaim("sub")),
            Role.Customer
        );

        mailService
            .sendPurchaseConfirmationMail(
                customer.getEmail(),
                category.getName(),
                amount,
                String.format(
                    "%s %s",
                    customer.getFirstName(),
                    customer.getLastName()
                )
            )
            .subscribe()
            .with(
                ignored -> {},
                error -> Log.error("Error while sending Email: ", error)
            );

        return tokens;
    }

    public Token updateToken(Token token, TokenDto dto) {
        Category category = categoryRepository.findById(dto.categoryId());
        Appointment appointment = appointmentRepository.getById(
            dto.appointmentId()
        );

        token.setCategory(category);
        token.setAppointment(appointment);

        UserRepresentation customer = keycloakUserRepository.getById(
            dto.userId(),
            Role.Customer
        );

        mailService
            .sendAppointmentConfirmationMail(
                customer.getEmail(),
                appointment.getName(),
                String.format(
                    "%s %s",
                    customer.getFirstName(),
                    customer.getLastName()
                )
            )
            .subscribe()
            .with(
                ignored -> {},
                error -> Log.error("Error while sending Email: ", error)
            );

        return getEntityManager().merge(token);
    }
}

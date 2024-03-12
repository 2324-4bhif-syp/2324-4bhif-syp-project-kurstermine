package at.htl.courseschedule.controller;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MailService {
    @Inject
    ReactiveMailer reactiveMailer;

    public Uni<Void> sendConfirmationMail(String email, String packetName, String receiver) {
        return sendMail(Mail.withText(
                email,
                String.format("Confirmation for %s", packetName),
                String.format(
                        "Dear %s! \n" +
                                "Your purchase of the package %s was successful!",
                        receiver, packetName
                )
        ));
    }

    private Uni<Void> sendMail(Mail mail) {
        return reactiveMailer.send(mail);
    }
}

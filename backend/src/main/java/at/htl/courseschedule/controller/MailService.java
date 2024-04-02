package at.htl.courseschedule.controller;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.reactive.ReactiveMailer;
import io.quarkus.qute.CheckedTemplate;
import io.quarkus.qute.TemplateInstance;
import io.smallrye.mutiny.Uni;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class MailService {
    @CheckedTemplate(requireTypeSafeExpressions = false)
    static class ConfirmationTemplate {
        static native TemplateInstance confirm(String packetName, String receiver);
    }

    @Inject
    ReactiveMailer reactiveMailer;

    public Uni<Void> sendConfirmationMail(String email, String packetName, String receiver) {
        return sendMail(Mail.withHtml(
                email,
                "Confirmation for Purchase",
                ConfirmationTemplate.confirm(packetName, receiver).render()
        ));
    }

    private Uni<Void> sendMail(Mail mail) {
        return reactiveMailer.send(mail);
    }
}

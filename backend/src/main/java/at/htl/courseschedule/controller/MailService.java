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
        static native TemplateInstance confirmPurchase(String categoryName, int amountOfTokens, String receiver);
        static native TemplateInstance confirmAppointmentBooking(String appointmentName, String receiver);
    }

    @Inject
    ReactiveMailer reactiveMailer;

    public Uni<Void> sendPurchaseConfirmationMail(String email, String categoryName, int amountOfTokens, String receiver) {
        return sendMail(Mail.withHtml(
                email,
                "Confirmation for Purchase",
                ConfirmationTemplate.confirmPurchase(categoryName, amountOfTokens, receiver).render()
        ));
    }

    public Uni<Void> sendAppointmentConfirmationMail(String email, String appointmentName, String receiver) {
        return sendMail(Mail.withHtml(
                email,
                "Confirmation for Booking",
                ConfirmationTemplate.confirmAppointmentBooking(appointmentName, receiver).render()
        ));
    }

    private Uni<Void> sendMail(Mail mail) {
        return reactiveMailer.send(mail);
    }
}

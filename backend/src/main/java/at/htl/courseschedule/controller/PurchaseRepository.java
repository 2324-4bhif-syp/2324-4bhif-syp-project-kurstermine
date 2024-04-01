package at.htl.courseschedule.controller;

import at.htl.courseschedule.boundary.Role;
import at.htl.courseschedule.entity.Packet;
import at.htl.courseschedule.entity.Participation;
import at.htl.courseschedule.entity.Purchase;
import at.htl.courseschedule.entity.ids.ParticipationId;
import at.htl.courseschedule.entity.ids.PurchaseId;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.validation.constraints.NotNull;
import org.keycloak.representations.idm.UserRepresentation;
import org.eclipse.microprofile.jwt.JsonWebToken;


import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class PurchaseRepository {
    @Inject
    EntityManager em;

    @Inject
    ParticipationRepository participationRepository;

    @Inject
    OfferRepository offerRepository;

    @Inject
    PacketRepository packetRepository;

    @Inject
    KeycloakUserRepository keycloakUserRepository;

    @Inject
    JsonWebToken jsonWebToken;

    @Inject
    MailService mailService;

    @Inject
    UserRepository userRepository;

    public List<Purchase> getAll() {
        return em.createQuery("SELECT p from Purchase p", Purchase.class).getResultList();
    }

    public List<Purchase> getAllByUserId(String customerId) {
        TypedQuery<Purchase> query =
                em.createQuery("SELECT p from Purchase p WHERE p.id.customerId = :userId",
                        Purchase.class);
        query.setParameter("userId", customerId);
        return query.getResultList();
    }

    public Purchase getById(PurchaseId id) {
        return em.find(Purchase.class, id);
    }

    public List<Purchase> getByPacketId(Long id) {
        TypedQuery<Purchase> query = em.createQuery(
                "SELECT p from Purchase p where p.packet.id = :packetId", Purchase.class);
        query.setParameter("packetId", id);
        return query.getResultList();
    }

    public List<Participation> create(@NotNull Purchase purchase) {
        if (purchase.getId() == null) {
            return null;
        }

        Packet packet = packetRepository.getById(purchase.getId().getPacketId());
        UserRepresentation user = keycloakUserRepository.getById(purchase.getId().getCustomerId(), Role.Customer);

        if (packet == null || user == null) {
            return null;
        }

        purchase.setPacket(packet);
        purchase.setCustomer(userRepository.getOrCreateUser(purchase.getId().getCustomerId()));

        List<Participation> newParticipations = new ArrayList<>();

        offerRepository.getAllByPacketId(packet.getId()).stream()
                .filter(offer -> participationRepository.getById(
                        new ParticipationId(offer.getAppointment().getId(), purchase.getId().getCustomerId())) == null)
                .forEach(offer -> {
                    Participation newParticipation = new Participation(
                            offer.getAppointment(),
                            purchase.getCustomer());
                    participationRepository.create(newParticipation);
                    newParticipations.add(newParticipation);
                }
        );

        em.merge(purchase);

        UserRepresentation loggedInCustomer = keycloakUserRepository.getById(jsonWebToken.getClaim("sub"), Role.Customer);

        mailService.sendConfirmationMail(
                loggedInCustomer.getEmail(),
                packet.getName(),
                String.format("%s %s", loggedInCustomer.getFirstName(), loggedInCustomer.getLastName())
        ).subscribe().with(
                ignored -> {},
                error -> Log.error("Error while sending Email: ", error)
        );

        return newParticipations;
    }

    public void delete(PurchaseId id) {
        em.remove(em.getReference(Purchase.class, id));
    }
}

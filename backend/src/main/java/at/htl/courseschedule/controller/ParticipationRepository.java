package at.htl.courseschedule.controller;

import at.htl.courseschedule.boundary.Role;
import at.htl.courseschedule.entity.Appointment;
import at.htl.courseschedule.entity.Participation;
import at.htl.courseschedule.entity.ids.ParticipationId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.validation.constraints.NotNull;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class ParticipationRepository {
    @Inject
    EntityManager em;

    @Inject
    AppointmentRepository appointmentRepository;

    @Inject
    KeycloakUserRepository keycloakUserRepository;

    @Inject
    UserRepository userRepository;

    public List<Participation> getAll() {
        return em.createQuery("SELECT p from Participation p", Participation.class).getResultList();
    }

    public List<Participation> getAllByUserId(UUID customerId) {
        TypedQuery<Participation> query =
                em.createQuery("SELECT p from Participation p WHERE p.id.customerId = :userId",
                        Participation.class);
        query.setParameter("userId", customerId);
        return query.getResultList();
    }

    public Participation getById(ParticipationId id) {
        return em.find(Participation.class, id);
    }

    public List<Participation> getByAppointmentId(Long id) {
        TypedQuery<Participation> query = em.createQuery(
                "SELECT p from Participation p where p.appointment.id = :appointmentId", Participation.class);
        query.setParameter("appointmentId", id);
        return query.getResultList();
    }

    public void create(@NotNull Participation participation) {
        if (participation.getId() == null) {
            return;
        }

        Appointment appointment = appointmentRepository.getById(participation.getId().getAppointmentId());
        UserRepresentation user = keycloakUserRepository.getById(participation.getId().getCustomerId(), Role.Customer);

        if (appointment == null || user == null) {
            return;
        }

        participation.setAppointment(appointment);
        participation.setCustomer(userRepository.getOrCreateUser(participation.getId().getCustomerId()));
        em.merge(participation);
    }

    public void delete(ParticipationId id) {
        em.remove(em.getReference(Participation.class, id));
    }
}

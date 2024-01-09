package at.htl.courseschedule.controller;

import at.htl.courseschedule.boundary.Role;
import at.htl.courseschedule.entity.Appointment;
import at.htl.courseschedule.entity.AppointmentManagement;
import at.htl.courseschedule.entity.ids.AppointmentManagementId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.validation.constraints.NotNull;

import java.util.List;

import org.keycloak.representations.idm.UserRepresentation;

@ApplicationScoped
public class AppointmentManagementRepository {
    @Inject
    EntityManager em;

    @Inject
    AppointmentRepository appointmentRepository;

    @Inject
    UserRepository userRepository;

    public AppointmentManagement getById(AppointmentManagementId id) {
        return em.find(AppointmentManagement.class, id);
    }

    public List<AppointmentManagement> getAll() {
        TypedQuery<AppointmentManagement> query = em.createQuery(
                "select am from AppointmentManagement am",
                    AppointmentManagement.class);
        return query.getResultList();
    }

    public void create(@NotNull AppointmentManagement appointmentManagement) {
        if (appointmentManagement.getId() == null) {
            return;
        }

        Appointment appointment = appointmentRepository.getById(appointmentManagement.getId().getAppointmentId());
        UserRepresentation user = userRepository.getById(appointmentManagement.getId().getInstructorId(), Role.Instructor);

        if (appointment == null || user == null) {
            return;
        }

        appointmentManagement.setAppointment(appointment);

        em.merge(appointmentManagement);
    }

    public void delete(AppointmentManagementId id) {
        em.remove(em.getReference(AppointmentManagement.class, id));
    }
}

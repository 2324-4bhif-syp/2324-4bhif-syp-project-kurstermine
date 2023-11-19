package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.AppointmentManagement;
import at.htl.courseschedule.entity.ids.AppointmentManagementId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@ApplicationScoped
public class AppointmentManagementRepository {
    @Inject
    EntityManager em;

    public AppointmentManagement getById(AppointmentManagementId id) {
        return em.find(AppointmentManagement.class, id);
    }

    public List<AppointmentManagement> getAll() {
        TypedQuery<AppointmentManagement> query = em.createQuery(
                "select am from AppointmentManagement am",
                    AppointmentManagement.class);
        return query.getResultList();
    }

    public AppointmentManagement create(@NotNull AppointmentManagement appointmentManagement) {
        if (appointmentManagement.getId() == null) {
            return null;
        }

        em.persist(appointmentManagement);
        return appointmentManagement;
    }

    public void delete(AppointmentManagementId id) {
        em.remove(em.getReference(AppointmentManagement.class, id));
    }
}

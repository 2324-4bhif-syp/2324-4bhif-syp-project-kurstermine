package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Appointment;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class AppointmentRepository {
    @Inject
    EntityManager em;

    public Appointment getById(Long id) { return em.find(Appointment.class, id); }

    public List<Appointment> getAll() {
        TypedQuery<Appointment> query = em.createQuery("select a from Appointment a", Appointment.class);
        return query.getResultList();
    }

    public List<Appointment> getAppointmentByUserName(String name) {
        TypedQuery<Appointment> query = em.createQuery(
                "select a from Appointment a where a.id = " +
                        "(select p.appointment.id from Participation p where p.customer.firstName = :name)", Appointment.class);
        query.setParameter("name", name);
        return query.getResultList();
    }

    public Appointment create(Appointment appointment) {
        em.persist(appointment);
        return appointment;
    }

    public void delete(Long id) {
        Appointment appointment = getById(id);
        if (appointment != null) {
            em.remove(appointment);
        }
    }

    public Appointment update(Long id, Appointment newAppointment) {

        if (getById(id) == null) {
            return null;
        }

        newAppointment.setId(id);
        em.merge(newAppointment);

        return newAppointment;
    }
}

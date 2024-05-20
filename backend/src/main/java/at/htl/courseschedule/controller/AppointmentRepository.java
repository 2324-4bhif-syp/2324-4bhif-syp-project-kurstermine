package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Appointment;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class AppointmentRepository {
    private static final double MIN_ENTROPY = .1;
    @Inject
    EntityManager em;

    public Appointment getById(Long id) { return em.find(Appointment.class, id); }

    public List<Appointment> getAll() {
        TypedQuery<Appointment> query = em.createQuery("select a from Appointment a", Appointment.class);
        return query.getResultList();
    }

    public List<Appointment> search(String pattern) {
        if (pattern.isEmpty()) {
            return getAll();
        }

        TypedQuery<Appointment> query = em.createQuery(SearchUtil.getSimilarityString(Appointment.class, "name", "address"), Appointment.class);
        query.setParameter("pattern", pattern);
        query.setParameter("minEntropy", MIN_ENTROPY);
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

    public List<Appointment> getByUserId(Long id) {
        TypedQuery<Appointment> query = em.createQuery(
                "SELECT a from Appointment a join AppointmentManagement am where a.id = am.appointment.id and am.instructor.id = :userId", Appointment.class);
        query.setParameter("userId", id);
        return query.getResultList();
    }
}

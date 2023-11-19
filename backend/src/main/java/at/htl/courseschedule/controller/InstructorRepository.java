package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Instructor;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class InstructorRepository {
    @Inject
    EntityManager em;

    public Instructor getById(Long id) { return em.find(Instructor.class, id); }

    public List<Instructor> getAll() {
        TypedQuery<Instructor> query = em.createQuery("select i from Instructor i", Instructor.class);
        return query.getResultList();
    }

    public Instructor create(Instructor instructor) {
        em.persist(instructor);
        return instructor;
    }

    public void delete(Long id) {
        Instructor instructor = getById(id);
        if (instructor != null) {
            em.remove(instructor);
        }
    }

    public Instructor update(Long id, Instructor newInstructor) {

        if (getById(id) == null) {
            return null;
        }

        newInstructor.setId(id);
        em.merge(newInstructor);

        return newInstructor;
    }
}

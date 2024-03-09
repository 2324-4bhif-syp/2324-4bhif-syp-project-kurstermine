package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Hire;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class HireRepository {
    @Inject
    EntityManager em;

    public List<Hire> getAll() {
        return em.createQuery("from Hire", Hire.class).getResultList();
    }

    public Hire getById(Long id) {
        return em.find(Hire.class, id);
    }

    public void create(Hire hire) {
        hire.setId(null);
        em.persist(hire);
    }

    public void delete(Long id) {
        em.remove(em.getReference(Hire.class, id));
    }

    public Hire update(Long id, Hire newHire) {
        if (getById(id) == null) return null;

        newHire.setId(id);
        em.merge(newHire);

        return newHire;
    }
}

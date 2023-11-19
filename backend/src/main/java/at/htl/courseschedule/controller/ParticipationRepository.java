package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Participation;
import at.htl.courseschedule.entity.ids.ParticipationId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@ApplicationScoped
public class ParticipationRepository {
    @Inject
    EntityManager em;

    public List<Participation> getAll() {
        return em.createQuery("SELECT p from Participation p", Participation.class).getResultList();
    }

    public Participation getById(ParticipationId id) {
        return em.find(Participation.class, id);
    }

    public void create(@NotNull Participation participation) {
        if (participation.getId() == null) {
            return;
        }

        em.merge(participation);
    }

    public void delete(ParticipationId id) {
        em.remove(em.getReference(Participation.class, id));
    }
}

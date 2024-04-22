package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Packet;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class PacketRepository {
    private static final double MIN_ENTROPY = .1;
    @Inject
    EntityManager em;

    public List<Packet> getAll() {
        return em.createQuery("from Packet", Packet.class).getResultList();
    }

    public Packet getById(Long id) {
        return em.find(Packet.class, id);
    }

    public List<Packet> search(String pattern) {
        if (pattern.isEmpty()) {
            return getAll();
        }

        TypedQuery<Packet> query = em.createQuery(Util.getSimilarityString(Packet.class, "name"), Packet.class);
        query.setParameter("pattern", pattern);
        query.setParameter("minEntropy", MIN_ENTROPY);
        return query.getResultList();
    }

    public List<Packet> getAllByOrganisatorId(Long id) {
        return em.createQuery("SELECT p from Packet p WHERE p.organisation.id = :id", Packet.class)
                .setParameter("id", id)
                .getResultList();
    }

    public void create(Packet packet) {
        packet.setId(null);
        em.persist(packet);
    }

    public void delete(Long id) {
        em.remove(em.getReference(Packet.class, id));
    }

    public Packet update(Long id, Packet newPacket) {
        return null;
    }
}

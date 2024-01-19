package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Packet;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class PacketRepository {
    @Inject
    EntityManager em;

    public List<Packet> getAll() {
        return em.createQuery("from Packet", Packet.class).getResultList();
    }

    public Packet getById(Long id) {
        return em.find(Packet.class, id);
    }

    public void create(Packet packet) {
        packet.setId(null);
        em.persist(packet);
    }

    public void delete(Long id) {
        em.remove(em.getReference(Packet.class, id));
    }

    public Packet update(Long id, Packet newPacket) {

        if (getById(id) == null) {
            return null;
        }

        newPacket.setId(id);
        em.merge(newPacket);

        return newPacket;
    }
}

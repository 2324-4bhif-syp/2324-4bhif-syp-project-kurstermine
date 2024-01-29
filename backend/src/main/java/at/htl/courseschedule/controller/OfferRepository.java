package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Appointment;
import at.htl.courseschedule.entity.Offer;
import at.htl.courseschedule.entity.Packet;
import at.htl.courseschedule.entity.ids.OfferId;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.validation.constraints.NotNull;

import java.util.List;

@ApplicationScoped
public class OfferRepository {
    @Inject
    EntityManager em;

    @Inject
    PacketRepository packetRepository;

    @Inject
    AppointmentRepository appointmentRepository;

    public Offer getById(OfferId id) {
        return em.find(Offer.class, id);
    }

    public List<Offer> getAll() {
        TypedQuery<Offer> query = em.createQuery("select o from Offer o", Offer.class);
        return query.getResultList();
    }

    public void create(@NotNull Offer offer){
        if(offer.getId() == null){
            return;
        }

        Packet packet = packetRepository.getById(offer.getId().getPacketId());
        Appointment appointment = appointmentRepository.getById(offer.getId().getAppointmentId());

        if(packet == null || appointment == null){
            return;
        }

        offer.setPacket(packet);
        offer.setAppointment(appointment);

        em.merge(offer);
    }

    public void delete(OfferId id) {
        em.remove(em.getReference(Offer.class, id));
    }
}

package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Organisation;
import at.htl.courseschedule.entity.Packet;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class OrganisationRepository implements PanacheRepository<Organisation> {
    @Inject
    OrganisationRepository organisationRepository;

    @Inject
    PacketRepository packetRepository;

    public List<Packet> getPacketsByOrganisationId(Long id) {
        Organisation organisation = organisationRepository.findById(id);

        if (organisation == null) {
            return null;
        }

        return packetRepository.getAllByOrganisatorId(id);
    }
}

package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.PacketRepository;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("packets")
public class PacketResource {
    @Inject
    PacketRepository packetRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPackets() {
        return Response.ok(packetRepository.getAll()).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPacket(@PathParam("id") Long id) {
        Packet packet = packetRepository.getById(id);

        if (packet == null) {
            return Response.status(404).build();
        }

        return Response.ok(packet).build();
    }

    @GET
    @Path("organisation/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPacketsByOrganisatorId(@PathParam("id") Long id) {
        var packets = packetRepository.getAllByOrganisatorId(id);

        if(packets == null) {
            return Response.status(404).build();
        }

        return Response.ok(packets).build();
    }

    @GET
    @Path("search")
    @RolesAllowed({Role.Admin, Role.Organisator, Role.Customer, Role.Instructor})
    public Response searchAppointments(@QueryParam("pattern") String pattern) {
        return Response.ok(packetRepository.search(pattern)).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response createPacket(Packet packet, @Context UriInfo uriInfo) {
        if (packet == null) {
            return Response.status(400).build();
        }

        packetRepository.create(packet);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(packet.getId().toString());

        return Response.created(uriBuilder.build()).entity(packet).build();
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response deletePacketById(@PathParam("id") Long id) {
        packetRepository.delete(id);
        return Response.status(200).build();
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response updatePacketById(@PathParam("id") Long id, Packet newPacket) {
        Packet packet = packetRepository.update(id, newPacket);

        if (packet == null) {
            return Response.status(404).build();
        }

        return Response.ok(packet).build();
    }
}

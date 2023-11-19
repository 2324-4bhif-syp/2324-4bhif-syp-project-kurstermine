package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.ParticipationRepository;
import at.htl.courseschedule.entity.Participation;
import at.htl.courseschedule.entity.ids.ParticipationId;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("/participations")
public class ParticipationResource {
    @Inject
    ParticipationRepository participationRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllParticipations() {
        return Response.ok(participationRepository.getAll()).build();
    }

    @GET
    @Path("{appointmentId}/{customerId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getParticipation(@PathParam("appointmentId") Long appointmentId,
                                     @PathParam("customerId") Long customerId) {
        Participation participation = participationRepository.getById(
                new ParticipationId(appointmentId, customerId));

        if (participation == null) {
            return Response.status(404).build();
        }

        return Response.ok(participation).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createParticipation(Participation participation, @Context UriInfo uriInfo) {
        if (participation == null) {
            return Response.status(400).build();
        }

        participationRepository.create(participation);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(participation.getId().toString());

        return Response.created(uriBuilder.build()).entity(participation).build();
    }

    @DELETE
    @Transactional
    @Path("{appointmentId}/{customerId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteParticipationById(@PathParam("appointmentId") Long appointmentId,
                                            @PathParam("customerId") Long customerId) {
        participationRepository.delete(new ParticipationId(appointmentId, customerId));
        return Response.status(200).build();
    }
}

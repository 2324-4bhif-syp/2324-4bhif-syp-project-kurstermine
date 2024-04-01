package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.ParticipationRepository;
import at.htl.courseschedule.entity.Participation;
import at.htl.courseschedule.entity.ids.ParticipationId;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.List;
import java.util.UUID;

@Path("/participations")
public class ParticipationResource {
    @Inject
    ParticipationRepository participationRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response getAllParticipations() {
        return Response.ok(participationRepository.getAll()).build();
    }

    @GET
    @Path("/customer/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Customer)
    public Response getParticipationsByCustomerId(@PathParam("id") String id) {
        return Response.ok(participationRepository.getAllByUserId(id)).build();
    }

    @GET
    @Path("{appointmentId}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Instructor, Role.Organisator, Role.Admin})
    public Response getParticipation(@PathParam("appointmentId") Long appointmentId) {
        List<Participation> participation = participationRepository.getByAppointmentId(appointmentId);

        if (participation.isEmpty()) {
            return Response.status(404).build();
        }

        return Response.ok(participation).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Customer,Role.Organisator, Role.Admin})
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
    @RolesAllowed({Role.Instructor, Role.Organisator, Role.Admin})
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteParticipationById(@PathParam("appointmentId") Long appointmentId,
                                            @PathParam("customerId") String customerId) {
        participationRepository.delete(new ParticipationId(appointmentId, UUID.fromString(customerId)));
        return Response.status(200).build();
    }
}

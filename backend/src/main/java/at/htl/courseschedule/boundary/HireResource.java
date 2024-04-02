package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.HireRepository;
import at.htl.courseschedule.entity.Hire;
import at.htl.courseschedule.entity.ids.HireId;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.UUID;

@Path("/hires")
public class HireResource {
    @Inject
    HireRepository hireRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response getAllHires() {
        return Response.ok(hireRepository.listAll()).build();
    }

    @GET
    @Path("{organisationId}/{instructorId}")
    @RolesAllowed({Role.Admin, Role.Organisator})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getHire(@PathParam("organisationId") Long organisationId,
                            @PathParam("instructorId") String instructorId) {
        Hire hire = hireRepository.findById(new HireId(organisationId, UUID.fromString(instructorId)));

        if (hire == null) {
            return Response.status(404).build();
        }

        return Response.ok(hire).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator})
    public Response createHire(Hire hire, @Context UriInfo uriInfo){
        if (hire == null) {
            return Response.status(400).build();
        }

        hireRepository.persist(hire);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(hire.getId().toString());

        return Response.created(uriBuilder.build()).entity(hire).build();
    }

    @DELETE
    @Transactional
    @Path("{organisationId}/{instructorId}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator})
    public Response deleteHireById(@PathParam("organisationId") Long organisationId,
                                   @PathParam("instructorId") String instructorId) {
        hireRepository.deleteById(new HireId(organisationId, UUID.fromString(instructorId)));
        return Response.noContent().build();
    }
}

package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.HireRepository;
import at.htl.courseschedule.entity.Hire;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("/hires")
public class HireResource {
    @Inject
    HireRepository hireRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response getAllHires() {
        return Response.ok(hireRepository.getAll()).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response getHire(@PathParam("id") Long id) {
        Hire hire = hireRepository.getById(id);

        if (hire == null) {
            return Response.status(404).build();
        }

        return Response.ok(hire).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator, Role.Instructor})
    public Response createHire(Hire hire, @Context UriInfo uriInfo){
        if (hire == null) {
            return Response.status(400).build();
        }

        hireRepository.create(hire);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(hire.getId().toString());

        return Response.created(uriBuilder.build()).entity(hire).build();
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator, Role.Instructor})
    public Response deleteHireById(@PathParam("id") Long id) {
        hireRepository.delete(id);

        return Response.noContent().build();
    }
}

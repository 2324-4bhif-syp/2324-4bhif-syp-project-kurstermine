package at.htl.courseschedule.boundary;

import org.keycloak.representations.idm.UserRepresentation;

import at.htl.courseschedule.controller.UserRepository;
import at.htl.courseschedule.dto.UserDTO;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@ApplicationScoped
@Path("/instructors")
public class InstructorResource {
    @Inject
    UserRepository userRepository;

    // TODO: get instructors only by organisations
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response getAllInstructors() {

        return Response.ok(userRepository.getAll(Role.Instructor)).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Customer, Role.Instructor, Role.Organisator, Role.Admin})
    public Response getInstructor(@PathParam("id") String id) {
        UserRepresentation instructor = userRepository.getById(id, Role.Instructor);

        if (instructor == null) {
            return Response.status(404).build();
        }

        return Response.ok(UserDTO.fromUserRepresentation(instructor)).build();
    }
}

package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.KeycloakUserRepository;
import at.htl.courseschedule.dto.UserDTO;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.UUID;

@ApplicationScoped
@Path("/instructors")
public class InstructorResource {
    @Inject
    KeycloakUserRepository userRepository;

    // TODO: get instructors only by organisations
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response getAllInstructors() {
        return Response.ok(userRepository.getAll(Role.Instructor).stream()
                .map(UserDTO::fromUserRepresentation)).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Customer, Role.Instructor, Role.Organisator, Role.Admin})
    public Response getInstructor(@PathParam("id") String id) {
        UserRepresentation instructor = userRepository.getById(UUID.fromString(id), Role.Instructor);

        if (instructor == null) {
            return Response.status(404).build();
        }

        return Response.ok(UserDTO.fromUserRepresentation(instructor)).build();
    }
}

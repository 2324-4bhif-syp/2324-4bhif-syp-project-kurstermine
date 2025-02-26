package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.KeycloakUserRepository;
import at.htl.courseschedule.dto.AdminUserDTO;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("users")
public class UserResource {
    @Inject
    KeycloakUserRepository userRepository;

    @GET
    @RolesAllowed(Role.Admin)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() {
        List<AdminUserDTO> users = userRepository
                .getAllUsers();

        return Response.ok(users).build();
    }
}

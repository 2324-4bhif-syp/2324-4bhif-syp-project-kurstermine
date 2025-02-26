package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.KeycloakUserRepository;
import at.htl.courseschedule.dto.AdminUserDTO;
import at.htl.courseschedule.dto.UserDTO;
import io.quarkus.oidc.runtime.OidcTenantConfig;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

@Path("users")
public class UserResource {
    @Inject
    KeycloakUserRepository userRepository;

    @GET
    @RolesAllowed(Role.Admin)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() {
        List<AdminUserDTO> users = userRepository.getAllUsers();

        return Response.ok(users).build();
    }

    @PUT
    @Path("{id}")
    @RolesAllowed(Role.Admin)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addRole(@PathParam("id") UUID id, @QueryParam("role") String role) {
        if (!userRepository.isValidRole(role)) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        userRepository.setRole(id, role);

        return Response.ok().build();
    }
}

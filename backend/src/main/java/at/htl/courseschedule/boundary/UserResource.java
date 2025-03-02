package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.KeycloakUserRepository;
import at.htl.courseschedule.controller.UserRepository;
import at.htl.courseschedule.dto.AdminUserDTO;
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
    KeycloakUserRepository keycloakUserRepository;

    @Inject
    UserRepository userRepository;

    @GET
    @RolesAllowed(Role.Admin)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers() {
        List<AdminUserDTO> users = keycloakUserRepository.getAllUsers().stream()
                .map(u -> u.withOrganisation(userRepository.getOrCreateUser(UUID
                        .fromString(u.id()))
                        .getOrganisation()))
                .toList();

        return Response.ok(users).build();
    }

    @PUT
    @Path("{id}")
    @RolesAllowed(Role.Admin)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addRole(@PathParam("id") UUID id, @QueryParam("role") String role) {
        if (keycloakUserRepository.isInValidRole(role)) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        keycloakUserRepository.setRole(id, role);

        return Response.ok().build();
    }

    @DELETE
    @Path("{id}")
    @RolesAllowed(Role.Admin)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteRole(@PathParam("id") UUID id, @QueryParam("role") String role) {
        if (keycloakUserRepository.isInValidRole(role)) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        keycloakUserRepository.deleteRole(id, role);

        return Response.ok().build();
    }
}

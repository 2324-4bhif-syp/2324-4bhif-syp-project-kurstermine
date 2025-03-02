package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.KeycloakUserRepository;
import at.htl.courseschedule.controller.OrganisationRepository;
import at.htl.courseschedule.controller.UserRepository;
import at.htl.courseschedule.dto.AdminUserDTO;
import at.htl.courseschedule.entity.User;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
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
    EntityManager em;

    @Inject
    UserRepository userRepository;

    @Inject
    OrganisationRepository organisationRepository;

    @GET
    @Transactional
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

        return Response.noContent().build();
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

    @PUT
    @Transactional
    @Path("{userId}/{orgId}")
    @RolesAllowed(Role.Admin)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addOrganisationToUser(@PathParam("userId") UUID userId, @PathParam("orgId") Long orgId) {
        if (organisationRepository.findById(orgId) == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        User user = userRepository.getOrCreateUser(userId);

        user.setOrganisation(organisationRepository.findById(orgId));
        em.merge(user);

        return Response.noContent().build();
    }

    @DELETE
    @Transactional
    @Path("{userId}/organisation")
    @RolesAllowed(Role.Admin)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteOrganisationFromUser(@PathParam("userId") UUID id) {
        userRepository.getOrCreateUser(id).setOrganisation(null);
        return Response.ok().build();
    }
}

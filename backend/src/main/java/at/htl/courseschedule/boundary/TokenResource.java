package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.AppointmentRepository;
import at.htl.courseschedule.controller.CategoryRepository;
import at.htl.courseschedule.controller.TokenRepository;
import at.htl.courseschedule.controller.UserRepository;
import at.htl.courseschedule.dto.TokenDto;
import at.htl.courseschedule.entity.Appointment;
import at.htl.courseschedule.entity.Category;
import at.htl.courseschedule.entity.Token;
import io.quarkus.logging.Log;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.UUID;

@Path("tokens")
public class TokenResource {
    @Inject
    TokenRepository tokenRepository;

    @Inject
    AppointmentRepository appointmentRepository;

    @Inject
    CategoryRepository categoryRepository;

    @Inject
    UserRepository userRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Instructor, Role.Customer, Role.Organisator}) //TODO - only admin
    public Response getAllTokens() {
        return Response.ok(tokenRepository.listAll().stream().map(TokenDto::fromToken)).build();
    }

    @GET
    @Path("{token-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Instructor, Role.Customer, Role.Organisator})
    public Response getById(@PathParam("token-id") UUID tokenId) {
        return Response.ok(TokenDto.fromToken(tokenRepository.findById(tokenId))).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Instructor, Role.Customer, Role.Organisator})
    public Response createToken(TokenDto dto, @Context UriInfo uriInfo) {
        if(dto == null) {
            return Response.status(400).build();
        }

        var token = new Token();
        token.setCategory(categoryRepository.findById(dto.categoryId()));
        token.setUser(userRepository.getOrCreateUser(dto.userId()));

        tokenRepository.persist(token);

        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(token.getId().toString());

        return Response.created(uriBuilder.build()).entity(TokenDto.fromToken(token)).build();
    }

    @DELETE
    @Path("{token-id}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator})
    public Response deleteToken(@PathParam("token-id") UUID tokenId) {
        Token token = tokenRepository.findById(tokenId);

        if(token == null) {
            return Response.status(404).build();
        }

        tokenRepository.delete(token);

        return Response.ok().build();
    }

    @PUT
    @Path("{token-id}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator, Role.Instructor, Role.Customer})
    public Response updateToken(@PathParam("token-id") UUID tokenId, TokenDto token) {
        Token oldToken = tokenRepository.findById(tokenId);

        if(oldToken == null) {
            return Response.status(404).build();
        }

        Category category = categoryRepository.findById(token.categoryId());
        Appointment appointment = appointmentRepository.getById(token.appointmentId());

        oldToken.setCategory(category);
        oldToken.setAppointment(appointment);

        return Response.ok(TokenDto.fromToken(oldToken)).build();
    }
}

package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.TokenRepository;
import at.htl.courseschedule.entity.Token;
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Instructor, Role.Customer, Role.Organisator}) //TODO - only admin
    public Response getAllTokens() {
        return Response.ok(tokenRepository.listAll()).build();
    }

    @GET
    @Path("{token-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Instructor, Role.Customer, Role.Organisator})
    public Response getById(@PathParam("token-id") UUID tokenId) {
        return Response.ok(tokenRepository.findById(tokenId)).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Instructor, Role.Customer, Role.Organisator})
    public Response createToken(Token token, @Context UriInfo uriInfo) {
        if(token == null) {
            return Response.status(400).build();
        }

        tokenRepository.persist(token);

        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(token.getId().toString());

        return Response.created(uriBuilder.build()).entity(token).build();
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

        return Response.ok(token).build();
    }

    @PUT
    @Path("{token-id}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator})
    public Response updateToken(@PathParam("token-id") UUID tokenId, Token token) {
        Token oldToken = tokenRepository.findById(tokenId);

        if(oldToken == null) {
            return Response.status(404).build();
        }

        oldToken.setCategory(token.getCategory());
        oldToken.setAppointment(token.getAppointment());

        tokenRepository.persist(oldToken);

        return Response.ok(oldToken).build();
    }
}

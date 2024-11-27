package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.TokenRepository;
import at.htl.courseschedule.dto.TokenDto;
import at.htl.courseschedule.entity.Token;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.List;
import java.util.UUID;

@Path("tokens")
public class TokenResource {
    @Inject
    TokenRepository tokenRepository;

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
    @Path("{amount-of-tokens}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Instructor, Role.Customer, Role.Organisator})
    public Response createToken(TokenDto dto, @PathParam("amount-of-tokens") int amountOfTokens, @Context UriInfo uriInfo) {
        if(dto == null || amountOfTokens < 1) {
            return Response.status(400).build();
        }

        List<Token> tokens = tokenRepository.createTokens(amountOfTokens, dto);

        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(tokens.get(tokens.size() - 1).getId().toString());

        return Response.created(uriBuilder.build()).entity(tokens.stream().map(TokenDto::fromToken)).build();
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

        return Response.ok(TokenDto.fromToken(tokenRepository.updateToken(oldToken, token))).build();
    }
}

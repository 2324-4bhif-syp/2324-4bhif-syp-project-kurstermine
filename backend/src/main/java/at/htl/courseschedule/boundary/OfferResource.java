package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.OfferRepository;
import at.htl.courseschedule.entity.Offer;
import at.htl.courseschedule.entity.ids.OfferId;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("/offers")
public class OfferResource {
    @Inject
    OfferRepository offerRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response getAllOffers() {
        return Response.ok(offerRepository.getAll()).build();
    }

    @GET
    @Path("{appointmentId}/{packetId}")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response getOffer(@PathParam("appointmentId") Long appointmentId,
                             @PathParam("packetId") Long packetId){
        Offer offer = offerRepository.getById(new OfferId(packetId, appointmentId));

        if (offer == null) {
            return Response.status(404).build();
        }

        return Response.ok(offer).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response createOffer(Offer offer, @Context UriInfo uriInfo) {
        if (offer == null) {
            return Response.status(400).build();
        }

        offerRepository.create(offer);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(offer.getId().toString());

        return Response.created(uriBuilder.build()).entity(offer).build();
    }

    @DELETE
    @Transactional
    @Path("{appointmentId}/{packetId}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response deleteOffer(@PathParam("appointmentId") Long appointmentId,
                                @PathParam("packetId") Long packetId){
        offerRepository.delete(new OfferId(appointmentId, packetId));

        return Response.noContent().build();
    }
}

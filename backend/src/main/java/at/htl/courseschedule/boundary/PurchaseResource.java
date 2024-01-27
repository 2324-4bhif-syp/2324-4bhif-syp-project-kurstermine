package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.PurchaseRepository;
import at.htl.courseschedule.entity.Purchase;
import at.htl.courseschedule.entity.ids.PurchaseId;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.List;

@Path("/purchases")
public class PurchaseResource {
    @Inject
    PurchaseRepository purchaseRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    public Response getAllPurchases() {
        return Response.ok(purchaseRepository.getAll()).build();
    }

    @GET
    @Path("/customer/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Customer)
    public Response getPurchasesByCustomerId(@PathParam("id") String id) {
        return Response.ok(purchaseRepository.getAllByUserId(id)).build();
    }

    @GET
    @Path("/{packetId}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Instructor, Role.Organisator, Role.Admin})
    public Response getPurchase(@PathParam("packetId") Long packetId) {
        List<Purchase> purchase = purchaseRepository.getByPacketId(packetId);

        if (purchase.isEmpty()) {
            return Response.status(404).build();
        }

        return Response.ok(purchase).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Customer,Role.Organisator, Role.Admin})
    public Response createPurchase(Purchase purchase, @Context UriInfo uriInfo) {
        if (purchase == null) {
            return Response.status(400).build();
        }

        purchaseRepository.create(purchase);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(purchase.getId().toString());

        return Response.created(uriBuilder.build()).entity(purchase).build();
    }

    @DELETE
    @Transactional
    @Path("/{packetId}/{customerId}")
    @RolesAllowed({Role.Instructor, Role.Organisator, Role.Admin})
    @Produces(MediaType.APPLICATION_JSON)
    public Response deletePurchaseById(@PathParam("packetId") Long packetId,
                                            @PathParam("customerId") String customerId) {
        purchaseRepository.delete(new PurchaseId(packetId, customerId));
        return Response.status(200).build();
    }
}

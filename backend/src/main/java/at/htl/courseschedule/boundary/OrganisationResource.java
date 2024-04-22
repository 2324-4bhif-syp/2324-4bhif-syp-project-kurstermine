package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.OrganisationImageRepository;
import at.htl.courseschedule.controller.OrganisationRepository;
import at.htl.courseschedule.entity.Organisation;
import at.htl.courseschedule.entity.OrganisationImage;
import at.htl.courseschedule.entity.Packet;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.util.List;

@Path("organisations")
public class OrganisationResource {
    @Inject
    OrganisationRepository organisationRepository;

    @Inject
    OrganisationImageRepository organisationImageRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response getAllOrganisations() {
        return Response.ok(organisationRepository.listAll()).build();
    }

    @GET
    @Path("{id}")
    @RolesAllowed({Role.Admin, Role.Organisator})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrganisation(@PathParam("id") Long id) {
        Organisation organisation = organisationRepository.findById(id);

        if (organisation == null) {
            return Response.status(404).build();
        }

        return Response.ok(organisation).build();
    }

    @GET
    @Path("{id}/image")
    @Transactional
    @PermitAll
    @Produces("image/png")
    public Response getOrganisationImage(@PathParam("id") Long id) {
        OrganisationImage organisationImage = organisationImageRepository
                .find("organisation.id", id)
                .firstResult();

        if (organisationImage == null) {
            return Response.status(404).build();
        }

        return Response.ok(organisationImage.getImage()).build();
    }

    @GET
    @Path("packets/{id}")
    @RolesAllowed({Role.Admin, Role.Organisator})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPacketsByOrganisationId(@PathParam("id") Long id) {
        Organisation organisation = organisationRepository.findById(id);

        if (organisation == null) {
            return Response.status(404).build();
        }

        List<Packet> packets = organisationRepository.getPacketsByOrganisationId(id);
        return Response.ok(packets).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator})
    public Response createOrganisation(Organisation organisation, @Context UriInfo uriInfo){
        if (organisation == null) {
            return Response.status(400).build();
        }

        organisationRepository.persist(organisation);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(organisation.getId().toString());

        return Response.created(uriBuilder.build()).entity(organisation).build();
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Admin, Role.Organisator})
    public Response deleteOrganisationById(@PathParam("id") Long id) {
        organisationRepository.deleteById(id);
        return Response.noContent().build();
    }
}

package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.AppointmentManagementRepository;
import at.htl.courseschedule.entity.AppointmentManagement;
import at.htl.courseschedule.entity.ids.AppointmentManagementId;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("/appointment-managements")
public class AppointmentManagementResource {
    @Inject
    AppointmentManagementRepository appointmentManagementRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAppointmentManagements() {
        return Response.ok(appointmentManagementRepository.getAll()).build();
    }

    @GET
    @Path("{appointmentId}/{instructorId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAppointmentManagement(@PathParam("appointmentId") Long appointmentId,
                                     @PathParam("instructorId") Long instructorId) {
        AppointmentManagement appointmentManagement = appointmentManagementRepository.getById(
                new AppointmentManagementId(appointmentId, instructorId));

        if (appointmentManagement == null) {
            return Response.status(404).build();
        }

        return Response.ok(appointmentManagement).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAppointmentManagement(AppointmentManagement appointmentManagement, @Context UriInfo uriInfo) {
        if (appointmentManagement == null) {
            return Response.status(400).build();
        }

        appointmentManagementRepository.create(appointmentManagement);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(appointmentManagement.getId().toString());

        return Response.created(uriBuilder.build()).entity(appointmentManagement).build();
    }

    @DELETE
    @Transactional
    @Path("{appointmentId}/{instructorId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAppointmentManagementById(@PathParam("appointmentId") Long appointmentId,
                                            @PathParam("instructorId") Long instructorId) {
        appointmentManagementRepository.delete(new AppointmentManagementId(appointmentId, instructorId));
        return Response.status(200).build();
    }
}

package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.AppointmentRepository;
import at.htl.courseschedule.entity.Appointment;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@ApplicationScoped
public class AppointmentResource {
    @Inject
    AppointmentRepository appointmentRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAppointments() {
        return Response.ok(appointmentRepository.getAll()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAppointment(@PathParam("id") Long id) {
        Appointment appointment = appointmentRepository.getById(id);

        if (appointment == null) {
            return Response.status(404).build();
        }

        return Response.ok(appointment).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAppointment(Appointment appointment, @Context UriInfo uriInfo) {
        if (appointment == null) {
            return Response.status(400).build();
        }

        appointmentRepository.create(appointment);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(appointment.getId().toString());

        return Response.created(uriBuilder.build()).entity(appointment).build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAppointmentById(@PathParam("id") Long id) {
        appointmentRepository.delete(id);
        return Response.status(200).build();
    }

    @PUT
    @Transactional
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateAppointmentById(@PathParam("id") Long id, Appointment newAppointment) {
        Appointment appointment = appointmentRepository.update(id, newAppointment);

        if (appointment == null) {
            return Response.status(404).build();
        }

        return Response.ok(appointment).build();
    }
}

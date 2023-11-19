package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.InstructorRepository;
import at.htl.courseschedule.entity.Instructor;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@ApplicationScoped
public class InstructorResource {
    @Inject
    InstructorRepository instructorRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllInstructors() {
        return Response.ok(instructorRepository.getAll()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getInstructor(@PathParam("id") Long id) {
        Instructor instructor = instructorRepository.getById(id);

        if (instructor == null) {
            return Response.status(404).build();
        }

        return Response.ok(instructor).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createInstructor(Instructor instructor, @Context UriInfo uriInfo) {
        if (instructor == null) {
            return Response.status(400).build();
        }

        instructorRepository.create(instructor);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(instructor.getId().toString());

        return Response.created(uriBuilder.build()).entity(instructor).build();
    }

    @DELETE
    @Transactional
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteInstructorById(@PathParam("id") Long id) {
        instructorRepository.delete(id);
        return Response.status(200).build();
    }

    @PUT
    @Transactional
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateInstructorById(@PathParam("id") Long id, Instructor newInstructor) {
        Instructor instructor = instructorRepository.update(id, newInstructor);

        if (instructor == null) {
            return Response.status(404).build();
        }

        return Response.ok(instructor).build();
    }
}

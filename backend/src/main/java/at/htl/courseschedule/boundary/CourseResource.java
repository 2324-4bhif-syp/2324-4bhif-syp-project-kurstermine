package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.CourseRepository;
import at.htl.courseschedule.entity.Course;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("Courses")
public class CourseResource {
    @Inject
    CourseRepository courseRepository;

    @GET
    @Path("{category-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin, Role.Instructor, Role.Customer})
    public Response getAllCourses(@PathParam("category-id") Long categoryId) {
        return Response.ok(courseRepository.getAllCoursesForCategory(categoryId)).build();
    }

    @GET
    @Path("id/{course-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Customer, Role.Admin, Role.Instructor, Role.Organisator})
    public Response getCourseById(@PathParam("course-id") Long courseId) {
        return Response.ok(courseRepository.findById(courseId)).build();
    }

    @POST
    @Path("{category-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    @Transactional
    public Response createCourse(@PathParam("category-id") Long categoryId, Course course, @Context UriInfo uriInfo) {
        UriBuilder builder = uriInfo.getAbsolutePathBuilder()
                .path(String.format("id/%d", courseRepository.addCourse(categoryId, course)));
        return Response.created(builder.build()).build();
    }

    @DELETE
    @Path("{course-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({Role.Organisator, Role.Admin})
    @Transactional
    public Response deleteCourse(@PathParam("course-id") Long courseId) {
        courseRepository.deleteById(courseId);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}

package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.CategoryRepository;
import at.htl.courseschedule.entity.Category;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("categories")
public class CategoryResource {

    @Inject
    CategoryRepository categoryRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({ Role.Organisator, Role.Admin, Role.Instructor, Role.Customer })
    public Response getAllCategories() {
        return Response.ok(categoryRepository.listAll()).build();
    }

    @GET
    @Path("{organisation-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({ Role.Admin, Role.Instructor, Role.Customer, Role.Organisator })
    public Response getAllCategoriesOfOrganisation(@PathParam("organisation-id") Long organisationId) {
        return Response.ok(categoryRepository.getAllForOrganisation(organisationId)).build();
    }

    @GET
    @Path("{organisation-id}/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({ Role.Admin, Role.Customer, Role.Organisator, Role.Instructor })
    public Response getCategoryByName(@PathParam("organisation-id") Long organisationId, @PathParam("name") String name) {
        return Response.ok(categoryRepository.getByName(organisationId, name)).build();
    }

    @POST
    @Path("{organisation-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({ Role.Admin, Role.Organisator })
    @Transactional
    public Response addCategory(@PathParam("organisation-id") Long organisationId, Category category, @Context UriInfo uriInfo) {
        if (!categoryRepository.addCategory(organisationId, category)) {
            return Response.status(Response.Status.CONFLICT).build();
        }

        UriBuilder builder = uriInfo.getAbsolutePathBuilder().path(String.format("%s/%s", organisationId, category.getName()));
        return Response.created(builder.build()).entity(category).build();
    }

    @DELETE
    @Path("{category-id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({ Role.Admin, Role.Organisator })
    @Transactional
    public Response deleteCategory(@PathParam("category-id") Long categoryId) {
        categoryRepository.deleteById(categoryId);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}

package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.CustomerRepository;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.keycloak.representations.idm.UserRepresentation;

@Path("/customers")
public class CustomerResource {
    @Inject
    JsonWebToken jsonWebToken;

    @Inject
    CustomerRepository customerRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response getAllCustomers() {
        return Response.ok(customerRepository.getAll()).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response getCustomer(@PathParam("id") String id) {
        UserRepresentation customer = customerRepository.getById(id);

        if (customer == null) {
            return Response.status(404).build();
        }

        return Response.ok(customer).build();
    }

    @GET
    @Path("/id")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.User)
    public Response getCustomerByIdGiven() {
        // TODO: fix getting single customer;
        UserRepresentation customer = customerRepository.getById(jsonWebToken.getClaim("sub"));

        if (customer == null) {
            return Response.status(404).build();
        }

        return Response.ok(customer).build();
    }

    /*@POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response createCustomer(Customer customer, @Context UriInfo uriInfo) {
        keycloak.realm("htl").users().create(new )

        if (customer == null) {
            return Response.status(400).build();
        }

        //customerRepository.create(customer);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(customer.getId().toString());

        return Response.created(uriBuilder.build()).entity(customer).build();
    }*/

    /*@DELETE
    @Transactional
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response deleteCustomerById(@PathParam("id") String id) {
        customerRepository.delete(id);
        return Response.status(200).build();
    }*/

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response updatePlayer(@PathParam("id") String id, UserRepresentation newCustomer) {
        // TODO: Use DTO
        UserRepresentation updatedCustomer = customerRepository.update(id, newCustomer);

        if (updatedCustomer == null) {
            return Response.status(404).build();
        }

        return Response.ok(updatedCustomer).build();
    }
}

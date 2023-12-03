package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.CustomerRepository;
import at.htl.courseschedule.entity.Customer;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("/customers")
public class CustomerResource {

    @Inject
    CustomerRepository customerRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response getAllCustomers() {
        return Response.ok(customerRepository.getAll()).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response getCustomer(@PathParam("id") Long id) {
        Customer customer = customerRepository.getById(id);

        if (customer == null) {
            return Response.status(404).build();
        }

        return Response.ok(customer).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response createCustomer(Customer customer, @Context UriInfo uriInfo) {
        if (customer == null) {
            return Response.status(400).build();
        }

        customerRepository.create(customer);
        UriBuilder uriBuilder = uriInfo
                .getAbsolutePathBuilder()
                .path(customer.getId().toString());

        return Response.created(uriBuilder.build()).entity(customer).build();
    }

    @DELETE
    @Transactional
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response deleteCustomerById(@PathParam("id") Long id) {
        customerRepository.delete(id);
        return Response.status(200).build();
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("admin")
    public Response updatePlayer(@PathParam("id") Long id, Customer newCustomer) {
        Customer updatedCustomer = customerRepository.update(id, newCustomer);

        if (updatedCustomer == null) {
            return Response.status(404).build();
        }

        return Response.ok(updatedCustomer).build();
    }
}

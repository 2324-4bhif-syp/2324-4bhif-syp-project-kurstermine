package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.CustomerRepository;
import at.htl.courseschedule.entity.Customer;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

@Path("/customers")
public class CustomerResource {

    @Inject
    CustomerRepository customerRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomers() {
        return Response.ok(customerRepository.getAllCustomers()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomer(@PathParam("id") Long id) {
        Customer customer = customerRepository.getCustomer(id);

        if (customer == null) {
            return Response.status(404).build();
        }

        return Response.ok(customer).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response createCustomer(Customer customer, @Context UriInfo uriInfo) {
        if (customer == null) {
            return Response.status(400).build();
        }

        customerRepository.addCustomer(customer);
        UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder().path(customer.getId().toString());
        return Response.created(uriBuilder.build()).build();
    }
}

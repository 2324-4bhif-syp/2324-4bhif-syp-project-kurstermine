package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.CustomerRepository;
import at.htl.courseschedule.entity.Customer;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/customers")
public class CustomerResource {

    @Inject
    CustomerRepository customerRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomers() {
        return Response.ok(customerRepository.getAllCustomers()).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response createCustomer(Customer customer) {
        if (customer == null) {
            return Response.status(400).build();
        }

        customerRepository.addCustomer(customer);
        return Response.status(201).entity(String.format("/customers/%d", customer.getId())).build();
    }
}

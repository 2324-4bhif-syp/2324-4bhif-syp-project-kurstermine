package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.CustomerRepository;
import at.htl.courseschedule.entity.Customer;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

@Path("/customers")
public class CustomerResource {
    @Inject
    SecurityIdentity identity;

    @Inject
    CustomerRepository customerRepository;

    @Inject
    Keycloak keycloak;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response getAllCustomers() {
        List<UserRepresentation> list = keycloak.realm("htl")
                .users()
                .list()
                .stream()
                .filter(user -> user.getRealmRoles().contains("user"))
                .toList();


        return Response.ok(list).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response getCustomer(@PathParam("id") Long id) {
        Customer customer = customerRepository.getById(id);

        if (customer == null) {
            return Response.status(404).build();
        }

        return Response.ok(customer).build();
    }

    @GET
    @Path("/name")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.User)
    public Response getCustomerByName() {
        Customer customer = customerRepository.getByName(identity.getPrincipal().getName());

        if (customer == null) {
            return Response.status(404).build();
        }

        return Response.ok(customer).build();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
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
    @RolesAllowed(Role.Admin)
    public Response deleteCustomerById(@PathParam("id") Long id) {
        customerRepository.delete(id);
        return Response.status(200).build();
    }

    @PUT
    @Transactional
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response updatePlayer(@PathParam("id") Long id, Customer newCustomer) {
        Customer updatedCustomer = customerRepository.update(id, newCustomer);

        if (updatedCustomer == null) {
            return Response.status(404).build();
        }

        return Response.ok(updatedCustomer).build();
    }
}

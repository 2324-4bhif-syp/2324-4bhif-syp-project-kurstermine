package at.htl.courseschedule.boundary;

import at.htl.courseschedule.controller.KeycloakUserRepository;
import at.htl.courseschedule.dto.UserDTO;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.UUID;

@Path("/customers")
public class CustomerResource {
    @Inject
    JsonWebToken jsonWebToken;

    @Inject
    KeycloakUserRepository userRepository;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response getAllCustomers() {
        return Response.ok(userRepository.getAll(Role.Customer).stream().map(UserDTO::fromUserRepresentation)).build();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Admin)
    public Response getCustomer(@PathParam("id") String id) {
        UserRepresentation customer = userRepository.getById(UUID.fromString(id), Role.Customer);

        if (customer == null) {
            return Response.status(404).build();
        }

        return Response.ok(UserDTO.fromUserRepresentation(customer)).build();
    }

    @GET
    @Path("/id")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Customer)
    public Response getCustomerByIdGiven() {
        UserRepresentation customer = userRepository.getById(jsonWebToken.getClaim("sub"), Role.Customer);

        if (customer == null) {
            return Response.status(404).build();
        }

        return Response.ok(UserDTO.fromUserRepresentation(customer)).build();
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
    public Response updateCustomer(@PathParam("id") String id, UserDTO newCustomer) {
        UserDTO updatedCustomer = userRepository.update(id, newCustomer, Role.Customer);

        if (updatedCustomer == null) {
            return Response.status(404).build();
        }

        return Response.ok(updatedCustomer).build();
    }

    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed(Role.Customer)
    public Response updateCustomerByIdGiven(UserDTO newCustomer) {
        UserDTO updatedCustomer = userRepository.update(jsonWebToken.getClaim("sub"), newCustomer, Role.Customer);

        if (updatedCustomer == null) {
            return Response.status(404).build();
        }

        return Response.ok(updatedCustomer).build();
    }
}

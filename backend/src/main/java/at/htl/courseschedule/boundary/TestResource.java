package at.htl.courseschedule.boundary;

import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.NoCache;

@Path("/test")
public class TestResource {
    @Inject
    SecurityIdentity identity;

    @GET
    @Path("/me")
    @Produces(MediaType.APPLICATION_JSON)
    @NoCache
    public Response me() {
        return Response.ok(new User(identity)).build();
    }

    public static class User {

        private final String userName;

        User(SecurityIdentity identity) {
            this.userName = identity.getPrincipal().getName();
        }

        public String getUserName() {
            return userName;
        }
    }

    @GET
    @Authenticated
    @Produces(MediaType.TEXT_PLAIN)
    @Path("/admin")
    public String admin() {
        return "granted";
    }
}

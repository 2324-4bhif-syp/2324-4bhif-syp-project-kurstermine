package at.htl.courseschedule.boundary;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("Tokens")
public class TokenResource {
    @GET
    public void get() {}
}

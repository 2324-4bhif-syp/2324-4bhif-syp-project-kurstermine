package at.htl.courseschedule.controller;

import at.htl.courseschedule.boundary.Role;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

@ApplicationScoped
public class CustomerRepository {
    @Inject
    Keycloak keycloak;

    public UserRepresentation getById(String id) {
        return keycloak.realm("htl").users().list().stream().filter(user -> user.getId().equals(id))
                .findFirst().orElse(null);
    }

    public List<UserRepresentation> getAll() {
        UsersResource users = keycloak.realm("htl").users(); // TODO: extract config prop
        List<String> ids = users.list().stream().map(UserRepresentation::getId).toList();
        return ids.stream().filter(id -> users.get(id).roles().getAll().getRealmMappings().stream()
                .anyMatch(role -> role.getName().equals(Role.Customer)))
                .map(id -> users.list().stream().filter(user -> user.getId().equals(id))
                        .findFirst().orElse(null)).toList();
    }

    /*public void delete(String id) {
        keycloak.realm("htl").users().delete(id);

        // TODO: implement properly usage
    }*/

    public UserRepresentation update(String id, UserRepresentation newCustomer) {

        // TODO: Use DTO
        if (getById(id) == null) {
            return null;
        }

        newCustomer.setId(id);
        //em.merge(newCustomer);

        return newCustomer;
    }
}

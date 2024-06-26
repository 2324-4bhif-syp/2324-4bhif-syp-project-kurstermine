package at.htl.courseschedule.controller;

import at.htl.courseschedule.dto.UserDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class KeycloakUserRepository {
    @Inject
    Keycloak keycloak;

    @ConfigProperty(name = "realm.name")
    String realmName;

    private UsersResource getUsers() {
        return keycloak.realm(realmName).users();
    }

    public UserRepresentation getById(UUID id, String role) {
        if (getUsers().get(id.toString()).roles().realmLevel().listEffective().stream()
                .noneMatch(r -> r.getName().equals(role))) {
            return null;
        }

        return getUsers().list().stream()
                .filter(user -> user.getId().equals(id.toString()))
                .findFirst()
                .orElse(null);
    }

    public List<UserRepresentation> getAll(String role) {
        UsersResource users = getUsers();
        List<String> ids = users.list().stream().map(UserRepresentation::getId).toList();

        return ids.stream().filter(id -> getById(UUID.fromString(id), role) != null)
                .map(id -> users.list().stream().filter(user -> user.getId().equals(id))
                        .findFirst().orElse(null)).toList();
    }

    public UserDTO update(String id, UserDTO newCustomer, String role) {
        UserRepresentation userRepresentation = getById(UUID.fromString(id), role);

        if (userRepresentation == null) {
            return null;
        }

        return update(userRepresentation, UUID.fromString(id), newCustomer);
    }

    private UserDTO update(UserRepresentation userRepresentation, UUID id, UserDTO newCustomer) {
        userRepresentation.setFirstName(newCustomer.firstName());
        userRepresentation.setLastName(newCustomer.lastName());
        userRepresentation.setEmail(newCustomer.email());

        getUsers().get(id.toString()).update(userRepresentation);

        return UserDTO.fromUserRepresentation(userRepresentation);
    }

    /*public void delete(String id) {
        getUsers().delete(id);
        getUsers().get(id).remove();
    }*/
}

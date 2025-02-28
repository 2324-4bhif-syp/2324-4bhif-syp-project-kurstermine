package at.htl.courseschedule.controller;

import at.htl.courseschedule.boundary.Role;
import at.htl.courseschedule.dto.AdminUserDTO;
import at.htl.courseschedule.dto.UserDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.AbstractUserRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@ApplicationScoped
public class KeycloakUserRepository {
    @Inject
    Keycloak keycloak;

    @ConfigProperty(name = "realm.name")
    String realmName;

    private UsersResource getUsers() {
        return keycloak.realm(realmName).users();
    }

    public List<AdminUserDTO> getAllUsers() {
        var users = getUsers()
                .list()
                .stream()
                .map(AdminUserDTO::fromUserRepresentation)
                .collect(Collectors.toMap(AdminUserDTO::id, Function.identity()));

        Role.EditableRoleNames.forEach(role ->
                keycloak.realm(realmName).roles()
                        .get(role)
                        .getUserMembers()
                        .stream()
                        .map(AbstractUserRepresentation::getId)
                        .forEach(id -> users.get(id).roles().add(role)));

        return users.values().stream().toList();
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

    public boolean isInValidRole(String role) {
        if (role == null || role.isEmpty()) {
            return true;
        }

        return Role.EditableRoleNames.contains(role);
    }

    public void setRole(UUID id, String roleName) {
        RoleRepresentation role = keycloak.realm(realmName).roles().get(roleName).toRepresentation();
        getUsers().get(id.toString()).roles().realmLevel().add(List.of(role));
    }

    public void deleteRole(UUID id, String roleName) {
        RoleRepresentation role = keycloak.realm(realmName).roles().get(roleName).toRepresentation();
        getUsers().get(id.toString()).roles().realmLevel().remove(List.of(role));
    }
}

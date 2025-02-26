package at.htl.courseschedule.dto;

import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

public record AdminUserDTO(String id, String firstName, String lastName, String email, List<String> roles) {
    public static AdminUserDTO fromUserRepresentation(UserRepresentation userRepresentation, List<String> roles) {
        return new AdminUserDTO(
                userRepresentation.getId(),
                userRepresentation.getFirstName(),
                userRepresentation.getLastName(),
                userRepresentation.getEmail(),
                roles
        );
    }
}

package at.htl.courseschedule.dto;

import org.keycloak.representations.idm.UserRepresentation;

public record UserDTO(String id, String firstName, String lastName, String email) {
    public static UserDTO fromUserRepresentation(UserRepresentation userRepresentation) {
        return new UserDTO(
                userRepresentation.getId(),
                userRepresentation.getFirstName(),
                userRepresentation.getLastName(),
                userRepresentation.getEmail()
        );
    }
}

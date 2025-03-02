package at.htl.courseschedule.dto;

import at.htl.courseschedule.entity.Organisation;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.ArrayList;
import java.util.List;

public record AdminUserDTO(String id, String firstName, String lastName, String email, List<String> roles, Organisation organisation) {
    public static AdminUserDTO fromUserRepresentation(UserRepresentation userRepresentation) {
        return new AdminUserDTO(
                userRepresentation.getId(),
                userRepresentation.getFirstName(),
                userRepresentation.getLastName(),
                userRepresentation.getEmail(),
                new ArrayList<>(),
                null
        );
    }

    public AdminUserDTO withOrganisation(Organisation organisation) {
        return new AdminUserDTO(
                this.id,
                this.firstName,
                this.lastName,
                this.email,
                this.roles,
                organisation
        );
    }
}

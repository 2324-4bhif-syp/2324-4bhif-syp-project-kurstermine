package at.htl.courseschedule.dto;

import at.htl.courseschedule.entity.Token;

import java.util.UUID;

public record TokenDto(UUID id, Long appointmentId, Long categoryId, UUID userId) {
    public static TokenDto fromToken(Token token) {
        return new TokenDto(
                token.getId(),
                token.getAppointment() != null ? token.getAppointment().getId() : null,
                token.getCategory().getId(),
                token.getUser().getId()
        );
    }
}

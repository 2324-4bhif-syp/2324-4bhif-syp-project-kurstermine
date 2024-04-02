package at.htl.courseschedule.entity.ids;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
public class ParticipationId implements Serializable {
    @JsonProperty("appointment_id")
    @Column(name = "appointment_id")
    private Long appointmentId;

    @JsonProperty("customer_id")
    @Column(name = "customer_id")
    private UUID customerId;

    public ParticipationId() {}

    public ParticipationId(Long appointmentId, UUID customerId) {
        this.appointmentId = appointmentId;
        this.customerId = customerId;
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public UUID getCustomerId() {
        return customerId;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        ParticipationId that = (ParticipationId) object;

        if (!appointmentId.equals(that.appointmentId)) return false;
        return customerId.equals(that.customerId);
    }

    @Override
    public int hashCode() {
        int result = appointmentId.hashCode();
        result = 31 * result + customerId.hashCode();
        return result;
    }
}

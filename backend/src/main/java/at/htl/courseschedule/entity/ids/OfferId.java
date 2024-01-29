package at.htl.courseschedule.entity.ids;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class OfferId implements Serializable {
    @JsonProperty("appointment_id")
    @Column(name = "appointment_id")
    private Long appointmentId;

    @JsonProperty("packet_id")
    @Column(name = "packet_id")
    private Long packetId;

    public OfferId() {}

    public OfferId(Long appointmentId, Long packetId) {
        this.appointmentId = appointmentId;
        this.packetId = packetId;
    }

    public Long getAppointmentId() {
        return this.appointmentId;
    }

    public Long getPacketId() {
        return this.packetId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OfferId offerId = (OfferId) o;

        if (!appointmentId.equals(offerId.appointmentId)) return false;
        return packetId.equals(offerId.packetId);
    }

    @Override
    public int hashCode() {
        int result = appointmentId.hashCode();
        result = 31 * result + packetId.hashCode();
        return result;
    }
}

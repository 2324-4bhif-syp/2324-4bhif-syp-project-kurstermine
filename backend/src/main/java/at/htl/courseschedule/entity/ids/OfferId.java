package at.htl.courseschedule.entity.ids;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

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
}

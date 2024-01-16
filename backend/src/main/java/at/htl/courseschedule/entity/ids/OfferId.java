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

    @JsonProperty("package_id")
    @Column(name = "package_id")
    private Long packageId;

    public OfferId() {}

    public OfferId(Long appointmentId, Long packageId) {
        this.appointmentId = appointmentId;
        this.packageId = packageId;
    }
}

package at.htl.courseschedule.entity.ids;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class AppointmentManagementId implements Serializable {
    @Column(name = "appointment_id")
    private Long appointmentId;
    @Column(name = "instructor_id")
    private Long instructorId;

    public AppointmentManagementId() {}

    public AppointmentManagementId(Long appointmentId, Long instructorId) {
        this.appointmentId = appointmentId;
        this.instructorId = instructorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AppointmentManagementId that = (AppointmentManagementId) o;

        if (!appointmentId.equals(that.appointmentId)) return false;
        return instructorId.equals(that.instructorId);
    }

    @Override
    public int hashCode() {
        int result = appointmentId.hashCode();
        result = 31 * result + instructorId.hashCode();
        return result;
    }
}

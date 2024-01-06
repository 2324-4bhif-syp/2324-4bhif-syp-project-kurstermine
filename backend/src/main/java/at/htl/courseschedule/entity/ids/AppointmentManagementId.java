package at.htl.courseschedule.entity.ids;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class AppointmentManagementId implements Serializable {
    @JsonProperty("appointment_id")
    @Column(name = "appointment_id")
    private Long appointmentId;

    @JsonProperty("instructor_id")
    @Column(name = "instructor_id")
    private String instructorId;

    public AppointmentManagementId() {}

    public AppointmentManagementId(Long appointmentId, String instructorId) {
        this.appointmentId = appointmentId;
        this.instructorId = instructorId;
    }


    public Long getAppointmentId() {
        return this.appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public String getInstructorId() {
        return this.instructorId;
    }

    public void setInstructorId(String instructorId) {
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

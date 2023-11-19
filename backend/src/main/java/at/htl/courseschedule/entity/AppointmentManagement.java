package at.htl.courseschedule.entity;

import at.htl.courseschedule.entity.ids.AppointmentManagementId;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "appointment_management")
public class AppointmentManagement {
    //region member variables
    @EmbeddedId
    private AppointmentManagementId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("appointmentId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Appointment appointment;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("customerId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Instructor instructor;
    //endregion

    //region constructors
    public AppointmentManagement() {
    }

    public AppointmentManagement(@NotNull Appointment appointment, @NotNull Instructor instructor) {
        this.appointment = appointment;
        this.instructor = instructor;
        this.id = new AppointmentManagementId(appointment.getId(), instructor.getId());
    }
    //endregion

    //region getter and setter
    public AppointmentManagementId getId() {
        return id;
    }

    public void setId(AppointmentManagementId id) {
        this.id = id;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Instructor getInstructor() {
        return instructor;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }
    //endregion

    @Override
    public String toString() {
        return "AppointmentManagement{" +
                "id=" + id +
                ", appointment=" + appointment +
                ", instructor=" + instructor +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AppointmentManagement that = (AppointmentManagement) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

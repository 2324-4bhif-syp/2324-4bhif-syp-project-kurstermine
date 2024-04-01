package at.htl.courseschedule.entity;

import at.htl.courseschedule.entity.ids.ParticipationId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Participation {
    @EmbeddedId
    private ParticipationId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("appointmentId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Appointment appointment;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("customerId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BabyUser customer;

    public Participation() {}

    public Participation(@NotNull Appointment appointment, @NotNull BabyUser customer) {
        this.appointment = appointment;
        this.id = new ParticipationId(appointment.getId(), customer.getUuid());
    }

    public ParticipationId getId() {
        return id;
    }

    public void setId(ParticipationId id) {
        this.id = id;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public BabyUser getCustomer() {
        return customer;
    }
    public void setCustomer(BabyUser customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        Participation that = (Participation) object;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

package at.htl.courseschedule.entity;

import at.htl.courseschedule.entity.ids.OfferId;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Offer {
    //region member variables
    @EmbeddedId
    private OfferId id;

    @ManyToOne
    @MapsId("appointmentId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Appointment appointment;
    //endregion

    //region constructors
    public Offer() {}

    public Offer(@NotNull Appointment appointment, @NotNull Long packageId) {
        this.appointment = appointment;
        this.id = new OfferId(appointment.getId(), packageId);
    }
    //endregion

    //region getter and setter
    public OfferId getId() {
        return id;
    }

    public void setId(OfferId id) {
        this.id = id;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
    //endregion

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", appointment='" + getAppointment() + "'" +
            "}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Offer)) return false;

        Offer offer = (Offer) o;

        return getId().equals(offer.getId());
    }
}

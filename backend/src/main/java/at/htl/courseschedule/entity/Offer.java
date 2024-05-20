package at.htl.courseschedule.entity;

import at.htl.courseschedule.entity.ids.OfferId;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne
    @MapsId("packetId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Packet packet;
    //endregion

    //region constructors
    public Offer() {}

    public Offer(@NotNull Appointment appointment, @NotNull Packet packet) {
        this.appointment = appointment;
        this.packet = packet;
        this.id = new OfferId(appointment.getId(), packet.getId());
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

    public Packet getPacket() {
        return packet;
    }

    public void setPacket(Packet packet) {
        this.packet = packet;
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
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        Offer that = (Offer) object;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

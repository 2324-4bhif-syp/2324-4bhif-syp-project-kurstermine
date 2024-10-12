package at.htl.courseschedule.entity;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class Token {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Appointment appointment;

    public Token(Category category, Appointment appointment) {
        this.category = category;
        this.appointment = appointment;
    }

    public Token() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }
}

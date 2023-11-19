package at.htl.courseschedule.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Appointment {
    //region member variables
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @JsonProperty("name")
    @Column(name = "name")
    protected String name;
    @JsonProperty("date")
    @Column(name = "date")
    private LocalDate date;
    //endregion

    //region constructors
    public Appointment() {
    }

    public Appointment(String name, LocalDate date) {
        this.name = name;
        this.date = date;
    }

    public Appointment(Long id, String name, LocalDate date) {
        this(name, date);
        this.id = id;
    }
    //endregion

    //region getter and setter
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    //endregion

    @Override
    public String toString() {
        return "Appointment{" +
                "name='" + name + '\'' +
                ", date=" + date +
                '}';
    }
}

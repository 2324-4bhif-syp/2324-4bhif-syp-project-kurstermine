package at.htl.courseschedule.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.Duration;
import java.time.LocalDate;

@Entity
public class Appointment {
    //region member variables
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("name")
    @Column(name = "name")
    private String name;
    @JsonProperty("date")
    @Column(name = "date")
    private LocalDate startDate;

    @JsonProperty("duration")
    @Column(name = "duration")
    private Duration duration;
    @JsonProperty("adress")
    @Column(name = "adress")
    private String address;
    //endregion

    //region constructors
    public Appointment() {
    }

    public Appointment(String name, LocalDate startDate, Duration duration, String address) {
        this.name = name;
        this.startDate = startDate;
        this.duration = duration;
        this.address = address;
    }

    public Appointment(Long id, String name, LocalDate startDate, Duration duration, String address) {
        this(name, startDate, duration, address);
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate date) {
        this.startDate = date;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
                ", startDate=" + startDate + '\'' +
                ", duration=" + duration + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}

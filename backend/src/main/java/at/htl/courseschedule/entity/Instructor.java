package at.htl.courseschedule.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import java.time.LocalDate;

@Entity
public class Instructor extends Person {
    //region member variables
    @JsonProperty("hiring_date")
    @Column(name = "hiring_date")
    private LocalDate hiringDate;
    //endregion

    //region constructors
    public Instructor() {
    }

    public Instructor(String firstName, String lastName, String email, LocalDate hiringDate) {
        super(firstName, lastName, email);
        this.hiringDate = hiringDate;
    }

    public Instructor(Long id, String firstName, String lastName, String email, LocalDate hiringDate) {
        this(firstName, lastName, email, hiringDate);
        this.id = id;
    }
    //endregion

    //region getter and setter
    public LocalDate getHiringDate() {
        return hiringDate;
    }

    public void setHiringDate(LocalDate hiringDate) {
        this.hiringDate = hiringDate;
    }
    //endregion


    @Override
    public String toString() {
        return "Instructor{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", hiringDate=" + hiringDate + '\'' +
                '}';
    }
}

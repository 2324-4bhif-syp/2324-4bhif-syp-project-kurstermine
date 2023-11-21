package at.htl.courseschedule.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
public class Customer extends Person {
    //region member variables
    @JsonProperty("date_of_birth")
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;
    //endregion

    //region constructors
    public Customer() {
    }

    public Customer(String firstName, String lastName, String email, LocalDate dateOfBirth) {
        super(firstName, lastName, email);
        this.dateOfBirth = dateOfBirth;
    }

    public Customer(Long id, String firstName, String lastName, String email, LocalDate dateOfBirth) {
        this(firstName, lastName, email, dateOfBirth);
        this.id = id;
    }
    //endregion

    //region getter and setter
    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    //endregion

    @Override
    public String toString() {
        return "Customer{" +
                "firstName='" + firstName +
                ", lastName=" + lastName +
                ", email=" + email +
                ", dateOfBirth=" + dateOfBirth.format(DateTimeFormatter.ISO_LOCAL_DATE) +
                "}";
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;
        if (!super.equals(object)) return false;

        Customer customer = (Customer) object;

        return dateOfBirth.equals(customer.dateOfBirth);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + dateOfBirth.hashCode();
        return result;
    }
}

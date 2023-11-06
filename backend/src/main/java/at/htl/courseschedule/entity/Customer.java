package at.htl.courseschedule.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Customer {
    //region member variables
    @JsonProperty("id")
    private Long id;
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    @JsonProperty("email")
    private String email;
    @JsonProperty("date_of_birth")
    private LocalDate dateOfBirth;
    //endregion

    //region constructors
    public Customer() {
    }

    public Customer(String firstName, String lastName, String email, LocalDate dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    public Customer(Long id, String firstName, String lastName, String email, LocalDate dateOfBirth) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }
    //endregion

    //region getter and setter
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
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
        return "Customer{" +
                "firstName='" + firstName +
                ", lastName=" + lastName +
                ", email=" + email +
                ", dateOfBirth=" + dateOfBirth.format(DateTimeFormatter.ISO_LOCAL_DATE) +
                "}";
    }

    public String toCsvString() {
        return String.format("%s,%s,%s,%s", firstName, lastName, email, dateOfBirth.format(DateTimeFormatter.ISO_LOCAL_DATE));
    }
}

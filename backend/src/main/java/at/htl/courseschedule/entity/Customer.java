package at.htl.courseschedule.entity;

import java.time.LocalDate;

public class Customer {
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dateOfBirth;

    public Customer() {
    }

    public Customer(String firstName, String lastName, String email, LocalDate dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

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

    @Override
    public String toString() {
        return "Customer{" +
                "firstName='" + firstName +
                ", lastName=" + lastName +
                ", email=" + email +
                ", dateOfBirth=" + dateOfBirth +
                "}";
    }
}

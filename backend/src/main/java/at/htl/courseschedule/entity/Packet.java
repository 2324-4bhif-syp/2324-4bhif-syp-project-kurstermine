package at.htl.courseschedule.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Packet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*@ManyToOne
    private Organisator organisator;*/

    /*@ManyToOne
    private List<Purchase> purchases = new ArrayList<>();*/

    @OneToMany(mappedBy = "packet")
    private List<Offer> offers = new ArrayList<>();

    private double price;

    private int amountOfMaxAppointments;

    public Packet() {
    }

    public Packet(List<Offer> offers, double price, int amountOfMaxAppointments) {
        this.offers = offers;
        this.price = price;
        this.amountOfMaxAppointments = Math.min(offers.size(), amountOfMaxAppointments);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Offer> getOffers() {
        return offers;
    }

    public void setOffers(List<Offer> appointments) {
        this.offers = appointments;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getAmountOfMaxAppointments() {
        return amountOfMaxAppointments;
    }

    public void setAmountOfMaxAppointments(int amountOfMaxAppointments) {
        this.amountOfMaxAppointments = amountOfMaxAppointments;
    }
}

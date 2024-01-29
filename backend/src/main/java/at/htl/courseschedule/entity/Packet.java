package at.htl.courseschedule.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @OneToMany(
            mappedBy = "packet",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.PERSIST,
                    CascadeType.REFRESH
            }
    )
    private List<Offer> offers = new ArrayList<>();

    @JsonProperty("price")
    @Column(name = "price")
    private double price;

    @JsonProperty("amount_of_max_appointments")
    @Column(name = "amount_of_max_appointments")
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

    @Override
    public String toString() {
        return "Packet{" +
                "id=" + id +
                ", offers=" + offers +
                ", price=" + price +
                ", amountOfMaxAppointments=" + amountOfMaxAppointments +
                '}';
    }
}

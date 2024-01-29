package at.htl.courseschedule.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
public class Packet {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*@ManyToOne
    private Organisator organisator;*/

    @JsonProperty("name")
    @Column(name = "name")
    private String name;

    @JsonProperty("price")
    @Column(name = "price")
    private double price;

    public Packet() {
    }

    public Packet(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Packet{" +
                "id=" + id +
                ", price=" + price +
                '}';
    }
}

package at.htl.courseschedule.entity;

import at.htl.courseschedule.entity.ids.PurchaseId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Purchase {
    @EmbeddedId
    private PurchaseId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("packetId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Packet packet;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("customerId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private BabyUser customer;

    public Purchase() {}

    public Purchase(@NotNull Packet packet, @NotNull BabyUser customer) {
        this.packet = packet;
        this.id = new PurchaseId(packet.getId(), customer.getUuid());
    }

    public PurchaseId getId() {
        return id;
    }

    public void setId(PurchaseId id) {
        this.id = id;
    }

    public Packet getPacket() {
        return packet;
    }

    public void setPacket(Packet packet) {
        this.packet = packet;
    }

    public BabyUser getCustomer() {
        return customer;
    }

    public void setCustomer(BabyUser customer) {
        this.customer = customer;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        Purchase that = (Purchase) object;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

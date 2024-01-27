package at.htl.courseschedule.entity;

import at.htl.courseschedule.entity.ids.PurchaseId;
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

    public Purchase() {}

    public Purchase(@NotNull Packet packet, @NotNull String customerId) {
        this.packet = packet;
        this.id = new PurchaseId(packet.getId(), customerId);
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

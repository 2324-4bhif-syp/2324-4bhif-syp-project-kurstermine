package at.htl.courseschedule.entity.ids;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class PurchaseId implements Serializable {
    @JsonProperty("packet_id")
    @Column(name = "packet_id")
    private Long packetId;

    @JsonProperty("customer_id")
    @Column(name = "customer_id")
    private String customerId;

    public PurchaseId() {}

    public PurchaseId(Long packetId, String customerId) {
        this.packetId = packetId;
        this.customerId = customerId;
    }

    public Long getPacketId() {
        return packetId;
    }

    public String getCustomerId() {
        return customerId;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        PurchaseId that = (PurchaseId) object;

        if (!packetId.equals(that.packetId)) return false;
        return customerId.equals(that.customerId);
    }

    @Override
    public int hashCode() {
        int result = packetId.hashCode();
        result = 31 * result + customerId.hashCode();
        return result;
    }
}

package at.htl.courseschedule.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.UUID;

@Entity
public class BabyUser extends PanacheEntityBase {
    @Id
    private UUID uuid;

    public BabyUser() {
    }

    public BabyUser(UUID uuid) {
        this.uuid = uuid;
    }

    public UUID getUuid() {
        return this.uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    @Override
    public String toString() {
        return "User{" +
                "uuid=" + uuid +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BabyUser user = (BabyUser) o;

        return uuid.equals(user.uuid);
    }

    @Override
    public int hashCode() {
        return uuid.hashCode();
    }
}

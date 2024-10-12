package at.htl.courseschedule.entity;

import at.htl.courseschedule.entity.ids.HireId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
public class Hire {
    @EmbeddedId
    private HireId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("organisationId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Organisation organisation;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("instructorId")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User instructor;

    public Hire() {}

    public Hire(@NotNull Organisation organisation, @NotNull User instructor) {
        this.organisation = organisation;
        this.id = new HireId(organisation.getId(), instructor.getUuid());
    }

    public HireId getId() {
        return id;
    }

    public void setId(HireId id) {
        this.id = id;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        Hire that = (Hire) object;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

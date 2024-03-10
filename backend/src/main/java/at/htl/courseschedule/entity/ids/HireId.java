package at.htl.courseschedule.entity.ids;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class HireId implements Serializable {
    @JsonProperty("organisation_id")
    @Column(name = "organisation_id")
    private Long organisationId;

    @JsonProperty("instructor_id")
    @Column(name = "instructor_id")
    private String instructorId;

    public HireId() {}

    public HireId(Long organisationId, String instructorId) {
        this.organisationId = organisationId;
        this.instructorId = instructorId;
    }

    public Long getOrganisationId() {
        return organisationId;
    }

    public String getInstructorId() {
        return instructorId;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        HireId that = (HireId) object;

        if (!organisationId.equals(that.organisationId)) return false;
        return instructorId.equals(that.instructorId);
    }

    @Override
    public int hashCode() {
        int result = organisationId.hashCode();
        result = 31 * result + instructorId.hashCode();
        return result;
    }
}

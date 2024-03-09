package at.htl.courseschedule.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class Hire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String organisator_id;
    private String instructor_id;

    public Hire() {
    }

    public Hire(String organisator_id, String instructor_id) {
        this.organisator_id = organisator_id;
        this.instructor_id = instructor_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrganisator_id() {
        return organisator_id;
    }

    public void setOrganisator_id(String organisator_id) {
        this.organisator_id = organisator_id;
    }

    public String getInstructor_id() {
        return instructor_id;
    }

    public void setInstructor_id(String instructor_id) {
        this.instructor_id = instructor_id;
    }

    @Override
    public String toString() {
        return "Hire{" +
                "id=" + id +
                ", organisator_id='" + organisator_id + '\'' +
                ", instructor_id='" + instructor_id + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Hire hire = (Hire) o;

        if (!id.equals(hire.id)) return false;
        if (!organisator_id.equals(hire.organisator_id)) return false;
        return instructor_id.equals(hire.instructor_id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}

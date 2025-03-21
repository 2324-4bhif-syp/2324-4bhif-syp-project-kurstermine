package at.htl.courseschedule.entity;

import jakarta.persistence.*;

@Entity
public class Organisation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String uniqueName;

    public Organisation() {}

    public Organisation(String name, String uniqueName) {
        this.name = name;
        this.uniqueName = uniqueName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUniqueName() {
        return uniqueName;
    }

    public void setUniqueName(String uniqueName) {
        this.uniqueName = uniqueName;
    }

    @Override
    public String toString() {
        return "Organisation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", uniqueName='" + uniqueName + '\'' +
                '}';
    }
}
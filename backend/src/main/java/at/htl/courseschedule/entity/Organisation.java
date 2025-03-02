package at.htl.courseschedule.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Organisation extends PanacheEntityBase {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String uniqueName;

    @OneToMany(
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.DETACH,
                    CascadeType.MERGE,
                    CascadeType.PERSIST,
                    CascadeType.REFRESH
            }
    )
    @JoinColumn(name = "organisation_id")
    private Set<User> organisators;

    public Organisation() {}

    public Organisation(String name, String uniqueName, Set<User> organisators) {
        this.name = name;
        this.uniqueName = uniqueName;
        this.organisators = organisators;
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

    public Set<User> getOrganisators() {
        return organisators;
    }

    @Override
    public String toString() {
        return "Organisation{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", uniqueName='" + uniqueName + '\'' +
                ", organisators=" + organisators +
                '}';
    }
}
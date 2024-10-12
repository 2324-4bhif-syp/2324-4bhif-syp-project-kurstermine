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

    @OneToMany
    private Set<User> organisators;

    @OneToMany
    private Set<Category> categories;

    public Organisation() {}

    public Organisation(String name, String uniqueName, Set<User> organisators, Set<Category> categories) {
        this.name = name;
        this.uniqueName = uniqueName;
        this.organisators = organisators;
        this.categories = categories;
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

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
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
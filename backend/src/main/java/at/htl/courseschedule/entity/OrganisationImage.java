package at.htl.courseschedule.entity;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "organisation_image")
public class OrganisationImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] image;

    @OneToOne
    private Organisation organisation;

    public OrganisationImage() {
    }

    public OrganisationImage(byte[] image, Organisation organisation) {
        this.image = image;
        this.organisation = organisation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    @Override
    public String toString() {
        return "OrganisationImage{" +
                "id=" + id +
                ", image=" + Arrays.toString(image) +
                ", organisation=" + organisation +
                '}';
    }
}

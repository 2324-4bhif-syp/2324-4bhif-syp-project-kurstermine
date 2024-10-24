package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Category;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class CategoryRepository implements PanacheRepository<Category> {
    @Inject
    OrganisationRepository organisationRepository;

    public List<Category> getAllForOrganisation(Long organisationId) {
       return this.find("organisation.id", organisationId).list();
    }

    public Category getByName(Long organisationId, String name) {
        return this.find("organisation.id", organisationId)
                .list().stream()
                .filter(c -> c.getName().equals(name))
                .findFirst()
                .orElse(null);
    }

    public boolean addCategory(Long organisationId, Category category) {
        if (getByName(organisationId, category.getName()) != null) {
            return false;
        }

        category.setOrganisation(organisationRepository.findById(organisationId));
        this.persist(category);
        return true;
    }
}

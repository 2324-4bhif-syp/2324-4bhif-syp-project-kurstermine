package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Category;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Map;

@ApplicationScoped
public class CategoryRepository implements PanacheRepositoryBase<Category, String> {
    @Inject
    OrganisationRepository organisationRepository;

    public List<Category> getAllForOrganisation(Long organisationId) {
       return organisationRepository.findById(organisationId).getCategories().values().stream().toList();
    }

    public Category getByName(Long organisationId, String name) {
        return organisationRepository.findById(organisationId).getCategories().get(name);
    }

    public boolean addCategory(Long organisationId, Category category) {
        Map<String, Category> categories = organisationRepository.findById(organisationId).getCategories();
        return categories.putIfAbsent(category.getName(), category) == null;
    }

    public void deleteCategory(Long organisationId, String category) {
        organisationRepository.findById(organisationId).getCategories().remove(category);
    }
}

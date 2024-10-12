package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Category;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CategoryRepository implements PanacheRepositoryBase<Category, String> {
}

package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Hire;
import at.htl.courseschedule.entity.ids.HireId;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class HireRepository implements PanacheRepositoryBase<Hire, HireId> {
}

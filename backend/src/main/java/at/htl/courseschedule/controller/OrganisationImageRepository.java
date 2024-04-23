package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.OrganisationImage;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class OrganisationImageRepository implements PanacheRepository<OrganisationImage> {
}

package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Organisation;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class OrganisationRepository implements PanacheRepository<Organisation> {
}

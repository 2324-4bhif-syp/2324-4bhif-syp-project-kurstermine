package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Organisation;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class OrganisationRepository implements PanacheRepository<Organisation> {
    private static final double MIN_ENTROPY = 0.1;

    @Inject
    EntityManager em;

    public List<Organisation> search(String pattern) {
        if (pattern.isEmpty()) {
            return listAll();
        }

        TypedQuery<Organisation> query = em.createQuery(SearchUtil.getSimilarityString(Organisation.class, "name"), Organisation.class);
        query.setParameter("pattern", pattern);
        query.setParameter("minEntropy", MIN_ENTROPY);
        return query.getResultList();
    }
}

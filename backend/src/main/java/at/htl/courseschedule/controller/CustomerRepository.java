package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Customer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.util.List;

@ApplicationScoped
public class CustomerRepository {
    @Inject
    EntityManager em;

    public Customer getById(Long id) {
        return em.find(Customer.class, id);
    }

    public List<Customer> getAll() {
        TypedQuery<Customer> query = em.createQuery("select c from Customer c", Customer.class);
        return query.getResultList();
    }

    public Customer create(Customer customer) {
        em.persist(customer);
        return customer;
    }

    public void delete(Long id) {
        Customer customer = getById(id);
        if (customer != null) {
            em.remove(customer);
        }
    }

    public Customer update(Long id, Customer newCustomer) {

        if (getById(id) == null) {
            return null;
        }

        newCustomer.setId(id);
        em.merge(newCustomer);

        return newCustomer;
    }
}

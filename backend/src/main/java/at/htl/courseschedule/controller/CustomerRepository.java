package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Customer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.constraints.NotNull;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class CustomerRepository {
    private final Map<Long, Customer> customers;
    private Long lastKey;

    public CustomerRepository() {
        this.customers = new HashMap<>();
        this.lastKey = 0L;
    }

    public void addCustomer(@NotNull Customer customer) {
        customers.put(++lastKey, customer);
        customer.setId(lastKey);
    }

    public List<Customer> getAllCustomers() {
        return customers.values().stream().toList();
    }

    public Customer getCustomer(Long id) {
        return customers.values().stream()
                .filter(customer -> customer.getId().equals(id))
                .findAny().orElse(null);
    }
}

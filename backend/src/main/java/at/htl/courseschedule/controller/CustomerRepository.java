package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Customer;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.constraints.NotNull;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ApplicationScoped
public class CustomerRepository {
    private Map<Long, Customer> customers;
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

    /**
     * Loads the Content of the Repository
     * <p>Should only be used on startup and after unittests</p>
     */
    public void loadCustomers(String fileLocation) {
        this.customers = new HashMap<>();

        try {
            List<String> lines = Files.readAllLines(Path.of(fileLocation));
            lines.stream()
                    .skip(1)
                    .filter(s -> !s.isBlank() && !s.isEmpty())
                    .forEach(line -> {
                        String[] elements = line.split(",");
                        addCustomer(new Customer(elements[0], elements[1], elements[2], LocalDate.parse(elements[3])));
                    });
        } catch (Exception e) {
            Log.error("Error while reading from file: " + e.getMessage());
        }
    }
}

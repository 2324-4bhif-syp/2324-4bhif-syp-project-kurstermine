package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Customer;
import jakarta.enterprise.context.ApplicationScoped;

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

    public void addCustomer(Customer customer) {
        if (customer == null) {
            return;
        }

        customers.put(++lastKey, customer);
        customer.setId(lastKey);
    }

    public List<Customer> getAllCustomers() {
        return customers.values().stream().toList();
    }

    /*private void addCustomerToCsv(Customer customer) {
        String filename = "src/main/resources/appointment.csv";

        try {
            Files.writeString(Path.of(filename),
                    "\n" + customer.toCsvString(),
                    StandardCharsets.UTF_8,
                    StandardOpenOption.APPEND);
        }
        catch (IOException e) {
            Log.error("Error while writing to file: " + e.getMessage());
        }
    }*/
}

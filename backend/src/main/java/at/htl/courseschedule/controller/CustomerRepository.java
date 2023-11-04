package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Customer;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class CustomerRepository {
    private List<Customer> customers = new ArrayList<>();

    public List<Customer> getAllCustomers() {
        return customers;
    }

    public void addCustomer(Customer customer) {
        customers.add(customer);
        addCustomerToCsv(customer);
    }

    private void addCustomerToCsv(Customer customer) {
        String filename = "src/main/resources/appointment.csv";
        File file = new File(filename);

        try {
            Files.writeString(file.toPath().toAbsolutePath(),
                    "\n" + customer.toCsvString(),
                    StandardCharsets.UTF_8,
                    StandardOpenOption.APPEND);
        }
        catch (IOException e) {
            Log.error("Error while writing to file: " + e.getMessage());
        }
    }

    public void setCustomers(List<Customer> customers) {
        this.customers = customers;
    }
}

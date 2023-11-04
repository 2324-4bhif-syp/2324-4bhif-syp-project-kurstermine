package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Customer;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class CustomerRepository {
    private List<Customer> customers = readFromCsv("appointment.csv");

    private List<Customer> readFromCsv(String fileName) {
        File file = new File("src/main/resources/" + fileName);
        List<Customer> customerList = new ArrayList<>();

        try {
            List<String> lines = Files.readAllLines(file.toPath().toAbsolutePath(), StandardCharsets.UTF_8);
            lines.remove(0);

            for (String line : lines) {
                String[] parts = line.split(",");
                Customer customer = new Customer(parts[0], parts[1], parts[2], LocalDate.parse(parts[3]));
                customerList.add(customer);
            }
        }
        catch (Exception e) {
            Log.error("Error while reading from file: " + e.getMessage());
        }

        return customerList;
    }

    public List<Customer> getAllCustomers() {
        return customers;
    }
}

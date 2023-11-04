package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Customer;
import io.quarkus.logging.Log;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class InitBean {
    @Inject
    CustomerRepository customerRepository;

    void readFromCsv(@Observes StartupEvent event) {
        String filename = "src/main/resources/appointment.csv";
        File file = new File(filename);
        List<Customer> customerList = new ArrayList<>();

        Log.info("Now reading from: " + filename);

        try {
            List<String> lines = Files.readAllLines(file.toPath().toAbsolutePath(), StandardCharsets.UTF_8);
            lines.remove(0);
            lines.removeIf(s -> s.isBlank() || s.isEmpty());

            for (String line : lines) {
                String[] parts = line.split(",");
                Customer customer = new Customer(parts[0], parts[1], parts[2], LocalDate.parse(parts[3]));
                customerList.add(customer);
            }
        }
        catch (Exception e) {
            Log.error("Error while reading from file: " + e.getMessage());
            return;
        }

        Log.info("Done reading from: " + filename);

        customerRepository.setCustomers(customerList);
    }
}

package at.htl.courseschedule.controller;

import io.quarkus.logging.Log;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class InitBean {
    public static final String FILE_LOCATION = "csv/appointment.csv";

    @Inject
    CustomerRepository customerRepository;

    void startUp(@Observes StartupEvent event) {
        customerRepository.loadCustomers(FILE_LOCATION);
    }

    void shutDown(@Observes ShutdownEvent event) {
        List<String> lines = new ArrayList<>();
        lines.add("Firstname,Lastname,Email,Birthdate"); // add headline

        customerRepository.getAllCustomers().forEach(customer -> lines.add(customer.toCsvString()));

        try {
            Files.write(Path.of(FILE_LOCATION), lines);
        } catch (Exception e) {
            Log.error("Error while writing to file: " + e.getMessage());
        }
    }
}

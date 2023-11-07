package at.htl.courseschedule.controller;

import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;

@ApplicationScoped
public class InitBean {
    public static final String FILE_LOCATION = "csv/appointment.csv";

    @Inject
    CustomerRepository customerRepository;

    void startUp(@Observes StartupEvent event) {
        customerRepository.loadCustomers(FILE_LOCATION);
    }

    void shutDown(@Observes ShutdownEvent event) {
        customerRepository.writeCustomersToFile(FILE_LOCATION);
    }
}

package at.htl.courseschedule.controller;

import io.quarkus.logging.Log;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;

@ApplicationScoped
public class InitBean {

    void startUp(@Observes StartupEvent event) {
        Log.info("Start-up!");
    }

    void shutDown(@Observes ShutdownEvent event) {
        Log.info("Shut-down!");
    }
}

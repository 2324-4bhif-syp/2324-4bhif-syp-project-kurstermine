package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Organisation;
import at.htl.courseschedule.entity.OrganisationImage;
import io.quarkus.logging.Log;
import io.quarkus.runtime.ShutdownEvent;
import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.io.InputStream;
import java.util.List;

@ApplicationScoped
public class InitBean {

    @Inject
    OrganisationImageRepository organisationImageRepository;

    @Inject
    OrganisationRepository organisationRepository;

    void startUp(@Observes StartupEvent event) {
        Log.info("Start-up!");
    }

    void shutDown(@Observes ShutdownEvent event) {
        Log.info("Shut-down!");
    }

    @Transactional
    void setImages(@Observes StartupEvent event) {
        List<Organisation> organisations = organisationRepository.listAll();
        List<String> imgNames = List.of(
                "google.png",
                "microsoft.png",
                "amazon.png",
                "apple.png",
                "facebook.png"
        );

        for (int i = 0; i < organisations.size() && i < imgNames.size(); i++) {
            Organisation o = organisations.get(i);

            InputStream inputStream = getClass()
                    .getClassLoader()
                    .getResourceAsStream("img/" + imgNames.get(i));

            if (!setOrganisationImage(o, inputStream)) return;

            Log.info(String.format("Setting image for %s succeeded!", o.getName()));
        }
    }

    private boolean setOrganisationImage(Organisation organisation, InputStream inputStream) {
        if (inputStream == null) {
            Log.error("Setting Images for Example-Data failed!");
            return false;
        }

        try {
            organisationImageRepository.persist(new OrganisationImage(inputStream.readAllBytes(), organisation));
        } catch (Exception e) {
            Log.error("Setting Images for Example-Data failed!");
            return false;
        }

        return true;
    }
}

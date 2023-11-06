package at.htl.courseschedule;

import at.htl.courseschedule.controller.CustomerRepository;
import at.htl.courseschedule.controller.InitBean;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.TestInstance;

@QuarkusTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CustomerResourceTest {
    @Inject
    CustomerRepository customerRepository;

    @AfterAll
    public void resetRepository() {
        customerRepository.loadCustomers(InitBean.FILE_LOCATION);
    }
}
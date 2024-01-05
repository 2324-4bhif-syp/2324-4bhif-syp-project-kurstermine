/*package at.htl.courseschedule;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CustomerResourceTest {

    @Test
    @Order(0)
    public void testCustomerEndpointGet_GetAllCustomers_Ok() {
        // Arrange
        Customer c1Result = new Customer(1L,
                "Johann",
                "Maier",
                "johann.maier@yahoo.com",
                LocalDate.of(2012,12,23));

        Customer c2Result = new Customer(2L,
                "Herbert",
                "Huber",
                "herbert.huber@gmx.com",
                LocalDate.of(1980,10,11));

        Customer c3Result = new Customer(3L,
                "Julia",
                "Schneider",
                "julia.schneider@outlook.com",
                LocalDate.of(2010,9,5));

        Customer c4Result = new Customer(4L,
                "Paul",
                "Schulz",
                "paul.schulz@aol.com",
                LocalDate.of(1970,4,15));

        Customer c5Result = new Customer(5L,
                "Anna",
                "Struff",
                "anna.struff@juno.com",
                LocalDate.of(1975,6,30));

        // Act
        Response res = given()
                .when()
                .get("/customers");

        List<Customer> customers = res
                .then()
                .log().body()
                .statusCode(200)
                .extract()
                .jsonPath()
                .getList(".", Customer.class);

        // Assert
        assertThat(customers).hasSize(5);

        assertThat(customers.get(0))
                .isEqualTo(c1Result);

        assertThat(customers.get(1))
                .isEqualTo(c2Result);

        assertThat(customers.get(2))
                .isEqualTo(c3Result);

        assertThat(customers.get(3))
                .isEqualTo(c4Result);

        assertThat(customers.get(4))
                .isEqualTo(c5Result);
    }

    @Test
    @Order(1)
    public void testCustomersEndpointPost_CreateCustomer_Ok() {
        // Arrange

        // Act
        given()
        .when()
                .body("""
                        {
                            "first_name": "Winnie",
                            "last_name": "Ilming",
                            "email": "winnie.ilming@gmail.com",
                            "date_of_birth": "2006-06-25"
                        }
                        """)
                .header("Content-Type", "application/json")
                .log().body()
                .post("/customers")
        .then()
                .log().body()
                .statusCode(201);

        // Assert
    }

    @Test
    @Order(10)
    public void testCustomersEndpointPost_CreateCustomerWithoutBody_BadRequest() {
        // Arrange

        // Act
        given()
        .when()
                .header("Content-Type", "application/json")
                .log().body()
                .post("/customers")
        .then()
                .log().body()
                .statusCode(400);

        // Assert
    }

    @Test
    @Order(20)
    public void testCustomerEndpointGetAfterPost_GetAllCustomers_Ok() {
        // Arrange
        Customer c1Result = new Customer(1L,
                "Johann",
                "Maier",
                "johann.maier@yahoo.com",
                LocalDate.of(2012,12,23));

        Customer c2Result = new Customer(2L,
                "Herbert",
                "Huber",
                "herbert.huber@gmx.com",
                LocalDate.of(1980,10,11));

        Customer c3Result = new Customer(3L,
                "Julia",
                "Schneider",
                "julia.schneider@outlook.com",
                LocalDate.of(2010,9,5));

        Customer c4Result = new Customer(4L,
                "Paul",
                "Schulz",
                "paul.schulz@aol.com",
                LocalDate.of(1970,4,15));

        Customer c5Result = new Customer(5L,
                "Anna",
                "Struff",
                "anna.struff@juno.com",
                LocalDate.of(1975,6,30));

        Customer c6Result = new Customer(6L,
                "Winnie",
                "Ilming",
                "winnie.ilming@gmail.com",
                LocalDate.of(2006,6,25));

        // Act
        Response res = given()
                .when()
                .get("/customers");

        List<Customer> customers = res
                .then()
                .log().body()
                .statusCode(200)
                .extract()
                .jsonPath()
                .getList(".", Customer.class);

        // Assert
        assertThat(customers).hasSize(6);

        assertThat(customers.get(0))
                .isEqualTo(c1Result);

        assertThat(customers.get(1))
                .isEqualTo(c2Result);

        assertThat(customers.get(2))
                .isEqualTo(c3Result);

        assertThat(customers.get(3))
                .isEqualTo(c4Result);

        assertThat(customers.get(4))
                .isEqualTo(c5Result);

        assertThat(customers.get(5))
                .isEqualTo(c6Result);
    }

    @Test
    @Order(30)
    public void testCustomersEndpointGet_GetCustomerById_Ok() {
        // Arrange
        Customer cResult = new Customer(6L,
                "Winnie",
                "Ilming",
                "winnie.ilming@gmail.com",
                LocalDate.of(2006,6,25));

        // Act
        Response res = given()
                .pathParam("id", "6")
                .when()
                .get("/customers/{id}");

        Customer customer = res
                .then()
                .log().body()
                .statusCode(200)
                .extract()
                .jsonPath()
                .getObject(".", Customer.class);

        // Assert
        assertThat(customer)
                .isEqualTo(cResult);
    }

    @Test
    @Order(40)
    public void testCustomersEndpointGet_GetNonExistingCustomerById_NotFound() {
        // Arrange

        // Act
        given()
                .pathParam("id", "9")
        .when()
                .log().body()
                .get("/customers/{id}")
        .then()
                .log().body()
                .statusCode(404);

        // Assert
    }
}*/
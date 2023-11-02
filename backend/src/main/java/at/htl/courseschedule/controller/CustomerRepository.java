package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Customer;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class CustomerRepository {
    private List<Customer> customers = readFromCsv("customers.csv");

    public List<Customer> readFromCsv(String fileName) {
        List<Customer> customerList = new ArrayList<>();
        try {
            List<String> lines = Files.readAllLines(Path.of("src/main/resources/" + fileName));
            for (String line : lines) {
                String[] parts = line.split(",");
                Customer customer = new Customer(parts[0], parts[1], parts[2], LocalDate.parse(parts[3]));
                customerList.add(customer);
            }
        } catch (Exception e) {
            System.out.println("Error while reading from file: " + e.getMessage());
        }
         return customerList;
    }
}

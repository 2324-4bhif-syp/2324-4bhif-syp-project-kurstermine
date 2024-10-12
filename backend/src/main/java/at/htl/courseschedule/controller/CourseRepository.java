package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Course;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CourseRepository implements PanacheRepository<Course> {
}

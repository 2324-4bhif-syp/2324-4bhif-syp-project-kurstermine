package at.htl.courseschedule.controller;

import at.htl.courseschedule.entity.Course;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class CourseRepository implements PanacheRepository<Course> {
    @Inject
    CategoryRepository categoryRepository;

    public List<Course> getAllCoursesForCategory(Long categoryId) {
        return categoryRepository.findById(categoryId).getCourses();
    }

    public Long addCourse(Long categoryId, Course course) {
        categoryRepository.findById(categoryId).getCourses().add(course);
        return course.getId();
    }

}

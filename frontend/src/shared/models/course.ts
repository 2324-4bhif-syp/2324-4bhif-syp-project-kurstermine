import { CourseDto } from '@models/dtos/course-dto';

export interface Course {
  id: number;
  name: string;
  categoryId: number;
}

export const fromCourseDto = (course: CourseDto): Course => {
  return {
    id: course.id,
    name: course.name,
    categoryId: course.category.id,
  };
}

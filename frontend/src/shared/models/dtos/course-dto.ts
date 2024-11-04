import { Course } from '@models';

export interface CourseDto {
    id: number;
    name: string;
    category: {
        id: number;
    };
}

export const fromCourse = (course: Course): CourseDto => {
    return {
        id: course.id,
        name: course.name,
        category: {
            id: course.categoryId,
        },
    };
};

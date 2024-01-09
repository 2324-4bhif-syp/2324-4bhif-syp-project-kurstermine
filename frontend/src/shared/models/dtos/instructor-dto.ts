import { Instructor } from '../instructor';

export interface InstructorDto {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
}

export const fromInstructor = (instructor: Instructor): InstructorDto => {
    return {
        id: instructor.id,
        firstName: instructor.firstName,
        lastName: instructor.lastName,
        email: instructor.email,
    };
};

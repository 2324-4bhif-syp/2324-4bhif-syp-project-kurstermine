import { Instructor } from '../instructor';

export interface InstructorDto {
    id?: number;
    email: string;
    first_name: string;
    last_name: string;
    hiring_date: string;
}

export const fromInstructor = (instructor: Instructor): InstructorDto => {
    return {
        id: instructor.id,
        first_name: instructor.firstName,
        last_name: instructor.lastName,
        email: instructor.email,
        hiring_date: instructor.hiringDate.toISOString(),
    };
};

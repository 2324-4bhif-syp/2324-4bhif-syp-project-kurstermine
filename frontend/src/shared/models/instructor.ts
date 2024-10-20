import { InstructorDto } from "@models/dtos";

/**
 * @deprecated Use user instead
 */
export interface Instructor {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const fromInstructorDto = (instructor: InstructorDto): Instructor => {
  return {
    id: instructor.id,
    firstName: instructor.firstName,
    lastName: instructor.lastName,
    email: instructor.email,
  };
};

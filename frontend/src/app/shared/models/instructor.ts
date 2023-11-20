import {InstructorDto} from "./dtos/instructor-dto";

export interface Instructor {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  hireDate: Date;
}

export const fromInstructorDto = (instructor: InstructorDto): Instructor => {
  return {
    id: instructor.id,
    firstName: instructor.first_name,
    lastName: instructor.last_name,
    email: instructor.email,
    hireDate: new Date(instructor.hire_date)
  }
}

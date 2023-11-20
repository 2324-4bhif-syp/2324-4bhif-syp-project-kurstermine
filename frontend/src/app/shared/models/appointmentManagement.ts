import { Appointment, fromAppointmentDto } from "./appointment"
import { Instructor, fromInstructorDto } from "./instructor"
import {AppointmentManagementDto} from "./dtos/appointment-management-dto";

export interface AppointmentManagement {
  id?: {
    appointmentId: number,
    instructorId: number
  },
  appointment: Appointment,
  instructor: Instructor
}

export const fromAppointmentManagementDto = (appointmentManagement: AppointmentManagementDto): AppointmentManagement  => {
  return {
    id: appointmentManagement.id ? { appointmentId: appointmentManagement.id.appointment_id,
      instructorId: appointmentManagement.id.instructor_id } : undefined,
    appointment: fromAppointmentDto(appointmentManagement.appointment),
    instructor: fromInstructorDto(appointmentManagement.instructor)
  }
}

import { Appointment, Instructor } from "@models";
import { AppointmentManagementDto } from "@models/dtos";

export interface AppointmentManagement {
    id?: {
        appointmentId: number;
        instructorId: string;
    };
    appointment: Appointment;
    instructor: Instructor;
}

export const fromAppointmentManagementDto = (
    appointmentManagement: AppointmentManagementDto,
): AppointmentManagement => {
    return {
        id: appointmentManagement.id
            ? {
                  appointmentId: appointmentManagement.id.appointment_id,
                  instructorId: appointmentManagement.id.instructor_id,
              }
            : undefined,
        appointment: null!, // :)
        instructor: null!, // :)
    };
};

import { AppointmentManagement } from '@models';

export interface AppointmentManagementDto {
    id?: {
        appointment_id: number;
        instructor_id: string;
    };
}

export const fromAppointmentManagement = (
    appointmentManagement: AppointmentManagement,
): AppointmentManagementDto => {
    return {
        id: appointmentManagement.id
            ? {
                  appointment_id: appointmentManagement.id.appointmentId,
                  instructor_id: appointmentManagement.id.instructorId,
              }
            : undefined
    };
};

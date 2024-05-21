import { AppointmentDto } from '@models/dtos';

export interface Appointment {
    id?: number;
    name: string;
    date: Date;
    duration: number;
    address: string;
}

export const fromAppointmentDto = (
    appointment: AppointmentDto,
): Appointment => {
    return {
        id: appointment.id,
        address: appointment.address,
        date: new Date(appointment.date),
        duration: appointment.duration / 60,
        name: appointment.name,
    };
};

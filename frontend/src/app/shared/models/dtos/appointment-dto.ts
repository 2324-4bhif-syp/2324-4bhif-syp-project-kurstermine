import { Appointment } from "../appointment"

export interface AppointmentDto {
    id?: number,
    name: string,
    date: string,
    duration: number,
    address: string
}

export const fromAppointment = (appointment: Appointment): AppointmentDto => {
    return {
        id: appointment.id,
        address: appointment.address,
        date: appointment.date.toISOString(),
        duration: appointment.duration * 60,
        name: appointment.name
    }
}
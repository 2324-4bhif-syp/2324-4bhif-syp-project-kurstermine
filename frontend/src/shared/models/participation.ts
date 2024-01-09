import { retry } from 'rxjs';
import { Appointment, fromAppointmentDto } from './appointment';
import { Customer, fromCustomerDto } from './customer';
import { ParticipationDto } from './dtos/participation-dto';

export interface Participation {
    id?: {
        appointmentId: number;
        customerId: string;
    };
    appointment: Appointment;
    customer: Customer;
}

export const fromParticipationDto = (
    participation: ParticipationDto,
): Participation => {
    return {
        id: participation.id
            ? {
                  appointmentId: participation.id.appointment_id,
                  customerId: participation.id.customer_id,
              }
            : undefined,
        appointment: null!,
        customer: null!,
    };
};

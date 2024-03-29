import { Participation } from '../participation';
import { AppointmentDto, fromAppointment } from './appointment-dto';
import { CustomerDto, fromCustomer } from './customer-dto';

export interface ParticipationDto {
    id?: {
        appointment_id: number;
        customer_id: string;
    };
}

export const fromParticipation = (
    participation: Participation,
): ParticipationDto => {
    return {
        id: participation.id
            ? {
                  appointment_id: participation.id.appointmentId,
                  customer_id: participation.id.customerId,
              }
            : undefined,
    };
};

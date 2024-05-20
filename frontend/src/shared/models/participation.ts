import { Appointment, Customer } from '@models';
import { ParticipationDto } from '@models/dtos';

export interface Participation {
    id?: {
        appointmentId: number;
        customerId: string;
    };
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
    };
};

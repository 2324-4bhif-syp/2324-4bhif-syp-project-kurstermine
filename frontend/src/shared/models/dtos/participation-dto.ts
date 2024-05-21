import { Participation } from '@models';

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

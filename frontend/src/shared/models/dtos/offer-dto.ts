import { Offer } from '@models';
import { AppointmentDto, fromAppointment } from './appointment-dto';

export interface OfferDto {
    id: {
        appointment_id: number;
        packet_id: number;
    };
    appointment: AppointmentDto;
}

export const fromOffer = (offer: Offer): OfferDto => {
    return {
        id: {
            appointment_id: offer.id.appointmentId,
            packet_id: offer.id.packetId,
        },
        appointment: fromAppointment(offer.appointment),
    };
};

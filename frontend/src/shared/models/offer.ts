import { Appointment, fromAppointmentDto, Packet } from '@models';
import { OfferDto } from '@models/dtos';

export interface Offer {
    id: {
        appointmentId: number;
        packetId: number;
    };
    appointment: Appointment;
    packet: Packet;
}

export const fromOfferDto = (offer: OfferDto): Offer => {
    return {
        id: {
            appointmentId: offer.id.appointment_id,
            packetId: offer.id.packet_id,
        },
        appointment: fromAppointmentDto(offer.appointment),
        packet: null!,
    };
};

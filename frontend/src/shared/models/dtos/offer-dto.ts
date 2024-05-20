import {Appointment, Offer, Packet} from "@models";

export interface OfferDto {
    id: {
        appointment_id: number,
        packet_id: number,
    },
    appointment: Appointment,
    packet: Packet
}

export const fromOffer = (offer: Offer): OfferDto => {
    return {
        id: {
            appointment_id: offer.id.appointmentId,
            packet_id: offer.id.packetId,
        },
        appointment: offer.appointment,
        packet: offer.packet
    }
}

import { Appointment } from "./appointment"
import { OfferDto } from "./dtos/offer-dto";
import {Packet} from "./packet";

export interface Offer {
    id: {
        appointmentId: number,
        packetId: number,
    }
    appointment: Appointment;
    packet: Packet;
}

export const fromOfferDto = (offer: OfferDto): Offer => {
    return {
        id: {
            appointmentId: offer.id.appointment_id,
            packetId: offer.id.packet_id,
        },
        appointment: null!,
        packet: null!,
    }
}

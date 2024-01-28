import { Offer } from "../offer";
import { AppointmentDto, fromAppointment } from "./appointment-dto";

export interface OfferDto {
    id: {
        appointment_id: number,
        packet_id: number,
    }
    appointment: AppointmentDto;
}

export const fromOffer = (offer: Offer): OfferDto => {
    return {
        id: offer.id,
        appointment: fromAppointment(offer.appointment)
    }
}
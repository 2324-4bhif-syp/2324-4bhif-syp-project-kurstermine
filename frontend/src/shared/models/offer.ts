import { Appointment, fromAppointmentDto } from "./appointment"
import { OfferDto } from "./dtos/offer-dto";

export interface Offer {
    id: {
        appointment_id: number,
        packet_id: number,
    }
    appointment: Appointment;
}

export const fromOfferDto = (offer: OfferDto): Offer => {
    return {
        id: offer.id,
        appointment: fromAppointmentDto(offer.appointment)
    }
}
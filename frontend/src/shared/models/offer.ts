import { Appointment, fromAppointmentDto } from "./appointment"
import { OfferDto } from "./dtos/offer-dto";

export interface Offer {
    id: {
        appointmentId: number,
        packetId: number,
    }
    appointment: Appointment;
}

export const fromOfferDto = (offer: OfferDto): Offer => {
    return {
        id: {
            appointmentId: offer.id.appointment_id,
            packetId: offer.id.packet_id,
        },
        appointment: fromAppointmentDto(offer.appointment)
    }
}

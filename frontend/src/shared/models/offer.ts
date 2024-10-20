import { Appointment, fromAppointmentDto, Packet } from "@models";
import { OfferDto } from "@models/dtos";

/**
 * @deprecated
 */
export interface Offer {
  id: {
    appointmentId: number;
    packetId: number;
  };
}

export const fromOfferDto = (offer: OfferDto): Offer => {
  return {
    id: {
      appointmentId: offer.id.appointment_id,
      packetId: offer.id.packet_id,
    },
  };
};

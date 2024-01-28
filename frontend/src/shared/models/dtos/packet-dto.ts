import { Packet } from "../packet";
import { OfferDto, fromOffer } from "./offer-dto";

export interface PacketDto {
    id: number,
    offers: OfferDto[];
}

export const fromPacket = (packet: Packet): PacketDto => {
    return {
        id: packet.id,
        offers: packet.offers.map(fromOffer)
    }
}
import { PacketDto } from "./dtos/packet-dto";
import { Offer, fromOfferDto } from "./offer";

export interface Packet {
    id: number,
    offers: Offer[];
}

export const fromPacketDto = (packet: PacketDto): Packet => {
    return {
        id: packet.id,
        offers: packet.offers.map(fromOfferDto)
    }
}
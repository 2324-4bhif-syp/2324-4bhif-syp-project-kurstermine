import { PacketDto } from "@models/dtos";
import { Organisation } from "@models";

export interface Packet {
    id?: number,
    name: string,
    price: number,
    organisation?: Organisation
}

export const fromPacketDto = (packet: PacketDto): Packet => {
    return {
        id: packet.id,
        name: packet.name,
        price: packet.price,
        organisation: packet.organisation
    }
}

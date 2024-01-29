import { Packet } from "../packet";

export interface PacketDto {
    id: number,
    name: string,
    price: number,
}

export const fromPacket = (packet: Packet): PacketDto => {
    return {
        id: packet.id,
        name: packet.name,
        price: packet.price,
    }
}

import { PacketDto } from "./dtos/packet-dto";

export interface Packet {
    id: number,
    name: string,
    price: number,
}

export const fromPacketDto = (packet: PacketDto): Packet => {
    return {
        id: packet.id,
        name: packet.name,
        price: packet.price,
    }
}

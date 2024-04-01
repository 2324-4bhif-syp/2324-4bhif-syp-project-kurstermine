import { PacketDto } from "./dtos/packet-dto";
import {Organisation} from "./organisation";

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

import { Packet } from "../packet";
import {Organisation} from "../organisation";

export interface PacketDto {
    id?: number,
    name: string,
    price: number,
    organisation?: Organisation
}

export const fromPacket = (packet: Packet): PacketDto => {
    return {
        id: packet.id,
        name: packet.name,
        price: packet.price,
        organisation: packet.organisation
    }
}

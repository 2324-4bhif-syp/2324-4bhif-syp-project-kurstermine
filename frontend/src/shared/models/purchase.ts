import {Customer} from "./customer";
import {Packet} from "./packet";
import {PurchaseDto} from "./dtos/purchase-dto";

export interface Purchase {
    id?: {
        packetId: number;
        customerId: string;
    };
    packet: Packet;
    customer: Customer;
}

export const fromPurchaseDto = (
    purchase: PurchaseDto,
): Purchase => {
    return {
        id: purchase.id
            ? {
                packetId: purchase.id.packet_id,
                customerId: purchase.id.customer_id,
            }
            : undefined,
        packet: null!,
        customer: null!,
    };
};

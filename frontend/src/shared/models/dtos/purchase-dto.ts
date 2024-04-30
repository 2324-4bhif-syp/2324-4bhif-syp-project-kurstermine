import {Purchase} from "@models";

export interface PurchaseDto {
    id?: {
        packet_id: number;
        customer_id: string;
    };
}

export const fromPurchase = (
    purchase: Purchase,
): PurchaseDto => {
    return {
        id: purchase.id
            ? {
                packet_id: purchase.id.packetId,
                customer_id: purchase.id.customerId,
            }
            : undefined,
    };
};

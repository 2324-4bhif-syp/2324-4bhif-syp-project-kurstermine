import { Customer, Packet } from '@models';
import { PurchaseDto } from '@models/dtos';

export interface Purchase {
    id?: {
        packetId: number;
        customerId: string;
    };
}

export const fromPurchaseDto = (purchase: PurchaseDto): Purchase => {
    return {
        id: purchase.id
            ? {
                  packetId: purchase.id.packet_id,
                  customerId: purchase.id.customer_id,
              }
            : undefined,
    };
};

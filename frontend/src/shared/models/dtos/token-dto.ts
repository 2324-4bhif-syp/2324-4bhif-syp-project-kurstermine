import { Token } from "@models";

export interface TokenDto {
    id: string; // UUID
    appointment?: {
        id?: number;
    };
    category: {
        id: number;
    };
    user: {
        id: string; // UUID
    };
    purchasedAt: Date;
    redeemedAt: Date;
}

export const fromToken = (token: Token): TokenDto => {
    return {
        id: token.id,
        appointment: {
            id: token.appointmentId
        },
        category: {
            id: token.categoryId
        },
        user: {
            id: token.userId
        },
        purchasedAt: token.purchasedAt,
        redeemedAt: token.redeemedAt
    };
};

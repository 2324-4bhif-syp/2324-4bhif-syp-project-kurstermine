import { Token } from '@models';

export interface TokenDto {
    id?: string; // UUID
    appointmentId?: number | null;
    categoryId: number;
    userId: string; // UUID
    purchasedAt?: Date;
    redeemedAt?: Date;
}

export const fromToken = (token: Token): TokenDto => {
    return {
        id: token.id,
        appointmentId: token.appointmentId,
        categoryId: token.categoryId,
        userId: token.userId,
        purchasedAt: token.purchasedAt,
        redeemedAt: token.redeemedAt,
    };
};

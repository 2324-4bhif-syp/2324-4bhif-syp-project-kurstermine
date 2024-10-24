import { TokenDto } from "@models/dtos/token-dto";

export interface Token {
  id: string; // UUID
  appointmentId?: number;
  categoryId: number;
  userId: string; // UUID
  purchasedAt: Date;
  redeemedAt: Date;
}

export const fromTokenDto = (token: TokenDto): Token => {
  return {
    id: token.id,
    appointmentId: token.appointmentId === null ? undefined : token.appointmentId,
    categoryId: token.categoryId,
    userId: token.userId,
    purchasedAt: new Date(token.purchasedAt),
    redeemedAt: new Date(token.redeemedAt),
  };
};

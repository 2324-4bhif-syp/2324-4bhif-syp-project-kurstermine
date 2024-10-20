export interface Token {
  id: string; // UUID
  appointmentId?: number;
  categoryId: number;
  userId: string; // UUID
  purchasedAt: Date;
  redeemedAt: Date;
}

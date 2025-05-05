export class TicketEntity {
  id: string;
  userId: string;
  seatId: string;
  screeningId: string;
  purchasedAt: Date;
  refunded?: boolean;

  // Optional relations
  user?: any;
  seat?: any;
  screening?: any;

  constructor(partial: Partial<TicketEntity>) {
    Object.assign(this, partial);
  }
}

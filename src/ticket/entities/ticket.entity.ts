export class TicketEntity {
    id: string;
    userId: string;
    seatId: string;
    screeningId: string;
    purchasedAt: Date;
    refunded: boolean;
    
    constructor(partial: Partial<TicketEntity>) {
        Object.assign(this, partial);
    }
}

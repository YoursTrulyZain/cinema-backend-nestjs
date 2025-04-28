import { Row } from "src/constants/seat";
import { TicketEntity } from "src/ticket/entities/ticket.entity";

export class SeatEntity {
    id: string;
    auditoriumId: string;
    row: Row
    number: number;
    ticket?: TicketEntity[];

    constructor(partial: Partial<SeatEntity>) {
        Object.assign(this, partial);
    }
}

import { TicketEntity } from "src/ticket/entities/ticket.entity";

export class UserEntity {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    isAdmin?: boolean;
    createdAt: Date;
    tickets: TicketEntity[];

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}

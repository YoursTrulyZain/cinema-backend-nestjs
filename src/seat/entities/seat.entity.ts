import { Row } from "src/constants/seat";

export class SeatEntity {
    id: string;
    auditoriumId: string;
    row: Row
    number: number;

    constructor(partial: Partial<SeatEntity>) {
        Object.assign(this, partial);
    }
}

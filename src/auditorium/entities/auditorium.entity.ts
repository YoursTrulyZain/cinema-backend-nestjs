import { AuditoriumType } from "src/constants/auditorium";
import { ScreeningEntity } from "src/screening/entities/screening.entity";
import { SeatEntity } from "src/seat/entities/seat.entity";

export class AuditoriumEntity {
    id: string;
    number: number;
    type: AuditoriumType;
    theatreId: string;
    seats: SeatEntity[];
    screenings?: ScreeningEntity[];

    constructor(partial: Partial<AuditoriumEntity>) {
        Object.assign(this, partial);
    }
}


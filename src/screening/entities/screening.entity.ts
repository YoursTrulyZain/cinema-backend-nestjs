import { Screening } from "@prisma/client"

export class ScreeningEntity implements Screening {
    id: string
    startTime: Date;
    movieId: string;
    auditoriumId: string;

    constructor(partial: Partial<Screening>) {
        Object.assign(this, partial);
      }
}

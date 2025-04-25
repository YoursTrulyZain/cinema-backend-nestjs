export class ScreeningEntity {
    id: string
    startTime: Date;
    movieId: string;
    auditoriumId: string;

    constructor(partial: Partial<ScreeningEntity>) {
        Object.assign(this, partial);
      }
}

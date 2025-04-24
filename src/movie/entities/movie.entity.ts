export class Movie {
    id: string;
    title: string;
    description: string;
    duration: number;

    constructor(partial: Partial<Movie>) {
        Object.assign(this, partial);
    }
}

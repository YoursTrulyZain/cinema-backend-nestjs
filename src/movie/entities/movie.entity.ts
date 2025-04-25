import { Movie } from "@prisma/client";
export class MovieEntity implements Movie {
    id: string;
    title: string;
    description: string;
    tags: string[];
    duration: number;

    constructor(partial: Partial<MovieEntity>) {
        Object.assign(this, partial);
    }
}

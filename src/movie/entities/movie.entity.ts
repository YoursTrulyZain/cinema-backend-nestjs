export class MovieEntity {
  id: string;
  title: string;
  description: string;
  tags: string[];
  duration: number;
  posterUrl: string;

  constructor(partial: Partial<MovieEntity>) {
    Object.assign(this, partial);
  }
}

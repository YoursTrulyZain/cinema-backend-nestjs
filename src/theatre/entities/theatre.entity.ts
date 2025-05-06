import { AuditoriumEntity } from 'src/auditorium/entities/auditorium.entity';

export class TheatreEntity {
  id: string;
  name: string;
  location: string;
  auditoriums?: AuditoriumEntity[];

  constructor(partial: Partial<TheatreEntity>) {
    Object.assign(this, partial);
  }
}

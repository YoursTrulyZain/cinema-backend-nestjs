import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: DatabaseService){}
  create(createMovieDto: CreateMovieDto) {
    return this.prisma.movie.create({ data: createMovieDto})
  }

  findAll() {
    return this.prisma.movie.findMany();
  }

  findOne(id: string) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  update(id: string, updateMovieDto: UpdateMovieDto) {
    return this.prisma.movie.update({
      where: { id },
      data: updateMovieDto
    });
  }

  remove(id: string) {
    return this.prisma.movie.delete({ where: { id }});
  }
}

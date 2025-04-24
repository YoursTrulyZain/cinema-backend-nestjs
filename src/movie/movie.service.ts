import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { DatabaseService } from 'src/database/database.service';
import { Movie } from './entities/movie.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class MovieService {

  constructor(private readonly prisma: DatabaseService){}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const movie = await this.prisma.movie.create({ data: createMovieDto});
      return new Movie(movie);
    }catch(error) {
      throw new InternalServerErrorException('Failed to create movie');
    }
  }

  async findAll(): Promise<Movie[]> {
    try {
      const movies = await this.prisma.movie.findMany();
      return movies.map(movie => new Movie(movie));
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch movies');
    }
  }

  async findOne(id: string): Promise<Movie> {
    try {
      const movie = await this.prisma.movie.findUniqueOrThrow({ where: { id } });
      return new Movie(movie);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to fetch movie');
    }
    
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    try {
      const movie = await this.prisma.movie.update({ where: { id }, data: updateMovieDto});
      return new Movie(movie);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to update movie');
    }
  }

  async remove(id: string): Promise<Movie> {
    try {
      const movie = await this.prisma.movie.delete({ where: { id }});
      return new Movie(movie);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete movie');
    }
  }
}

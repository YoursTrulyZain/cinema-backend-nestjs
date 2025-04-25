import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { IMovieRepository } from './interfaces/movie-repository.interface';

@Injectable()
export class MovieService {

  constructor(private readonly movieRepository: IMovieRepository) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    return this.movieRepository.create(createMovieDto);
  }

  async findAll(): Promise<MovieEntity[]> {
    return this.movieRepository.findAll();
  }

  async findOne(id: string): Promise<MovieEntity> {
    return this.movieRepository.findOne(id);
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<MovieEntity> {
    return this.movieRepository.update(id, updateMovieDto);
  }

  async remove(id: string): Promise<MovieEntity> {
    return this.movieRepository.remove(id);
  }
}
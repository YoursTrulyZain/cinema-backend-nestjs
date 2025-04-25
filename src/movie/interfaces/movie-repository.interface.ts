import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieEntity } from '../entities/movie.entity';

export interface IMovieRepository {
  create(data: CreateMovieDto): Promise<MovieEntity>;
  findAll(): Promise<MovieEntity[]>;
  findOne(id: string): Promise<MovieEntity>;
  update(id: string, data: UpdateMovieDto): Promise<MovieEntity>;
  remove(id: string): Promise<MovieEntity>;
}

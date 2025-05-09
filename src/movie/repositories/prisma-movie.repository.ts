import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { MovieEntity } from "../entities/movie.entity";
import { Prisma } from "@prisma/client";
import { UpdateMovieDto } from "../dto/update-movie.dto";
import { CreateMovieDto } from "../dto/create-movie.dto";
import { IMovieRepository } from "../interfaces/movie-repository.interface";
import { PrismaService } from "prisma/prisma.service";


@Injectable()
export class PrismaMovieRepository implements IMovieRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
        try {
          const movie = await this.prisma.movie.create({ data: createMovieDto});
          return new MovieEntity(movie);
        }catch(error) {
          throw new InternalServerErrorException('Failed to create movie');
        }
      }
    
      async findAll(): Promise<MovieEntity[]> {
        try {
          const movies = await this.prisma.movie.findMany();
          return movies.map(movie => new MovieEntity(movie));
        } catch (error) {
          throw new InternalServerErrorException('Failed to fetch movies');
        }
      }
    
      async findOne(id: string): Promise<MovieEntity> {
        try {
          const movie = await this.prisma.movie.findUniqueOrThrow({ where: { id } });
          return new MovieEntity(movie);
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
          ) {
            throw new NotFoundException(`MovieEntity with ID ${id} not found`);
          }
          throw new InternalServerErrorException('Failed to fetch movie');
        }
        
      }
    
      async update(id: string, updateMovieDto: UpdateMovieDto): Promise<MovieEntity> {
        try {
          const movie = await this.prisma.movie.update({ where: { id }, data: updateMovieDto});
          return new MovieEntity(movie);
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
          ) {
            throw new NotFoundException(`MovieEntity with ID ${id} not found`);
          }
          throw new InternalServerErrorException('Failed to update movie');
        }
      }
    
      async remove(id: string): Promise<MovieEntity> {
        try {
          const movie = await this.prisma.movie.delete({ where: { id }});
          return new MovieEntity(movie);
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
          ) {
            throw new NotFoundException(`MovieEntity with ID ${id} not found`);
          }
          throw new InternalServerErrorException('Failed to delete movie');
        }
      }
}
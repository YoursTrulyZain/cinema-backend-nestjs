import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateScreeningDto } from "../dto/create-screening.dto";
import { ScreeningEntity } from "../entities/screening.entity";
import { Prisma } from "@prisma/client";
import { UpdateScreeningDto } from "../dto/update-screening.dto";

@Injectable()
export class PrismaScreeningRepository {

    constructor(private readonly prisma: PrismaService) {}

    async create(createScreeningDto: CreateScreeningDto): Promise<ScreeningEntity> {
        try {
          const screening = await this.prisma.screening.create( {data: createScreeningDto} );
          return new ScreeningEntity(screening)
        } catch (error) {
          throw new InternalServerErrorException('Failed to create screening');
        }
      }
    
      async findAll(): Promise<ScreeningEntity[]> {
        try {
          const screenings = await this.prisma.screening.findMany();
          return screenings.map(screening => new ScreeningEntity(screening));
        } catch (error) {
          throw new InternalServerErrorException('Failed to fetch screenings');
        }
      }
    
      async findOne(id: string): Promise<ScreeningEntity> {
        try {
          const screening = await this.prisma.screening.findUniqueOrThrow({where: {id}})
          return new ScreeningEntity(screening)
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
          ) {
            throw new NotFoundException(`Screening with ID ${id} not found`);
          }
          throw new InternalServerErrorException('Failed to fetch screening');
        }
      }
    
      async update(id: string, updateScreeningDto: UpdateScreeningDto): Promise<ScreeningEntity> {
        try {
          const screening = await this.prisma.screening.update({where: {id}, data: updateScreeningDto})
          return new ScreeningEntity(screening)
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
          ) {
            throw new NotFoundException(`Screening with ID ${id} not found`);
          }
          throw new InternalServerErrorException('Failed to update screening');
        }
      }
    
      async remove(id: string): Promise<ScreeningEntity> {
        try {
          const screening = await this.prisma.screening.delete({where: {id}})
          return new ScreeningEntity(screening)
        } catch (error) {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
          ) {
            throw new NotFoundException(`Screening with ID ${id} not found`);
          }
          throw new InternalServerErrorException('Failed to delete screening');
        }
      }
}
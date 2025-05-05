import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateTheatreDto } from '../dto/create-theatre.dto';
import { TheatreEntity } from '../entities/theatre.entity';
import { ALL_ROWS } from 'src/constants/seat';
import { CreateAuditoriumInput } from '../dto/create-auditorium.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaTheatreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTheatreDto: CreateTheatreDto): Promise<TheatreEntity> {
    try {
      const { name, location, phone, email, auditoriums } = createTheatreDto;

      const createdTheatre = await this.prisma.theatre.create({
        data: { name, location, phone, email },
      });

      if (auditoriums.length > 0) {
        const auditoriumPromises = auditoriums.map((auditorium) =>
          this.createAuditorium(createdTheatre, auditorium),
        );
        await Promise.all(auditoriumPromises);
      }

      return new TheatreEntity(createdTheatre);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Failed to create theatre: ${error.message}`);
      }
      throw error;
    }
  }

  async findAll(): Promise<TheatreEntity[]> {
    try {
      const theatres = await this.prisma.theatre.findMany();
      return theatres.map((theatre) => new TheatreEntity(theatre));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Failed to fetch theatres: ${error.message}`);
      }
      throw error;
    }
  }

  async findOne(id: string): Promise<TheatreEntity> {
    try {
      const theatre = await this.prisma.theatre.findUniqueOrThrow({
        where: { id },
      });
      return new TheatreEntity(theatre);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Theatre with ID ${id} not found`);
        }
        throw new Error(`Failed to fetch theatre: ${error.message}`);
      }
      throw error;
    }
  }

  async findAllWithEverything(): Promise<TheatreEntity[]> {
    try {
      const theatres = await this.prisma.theatre.findMany({
        include: {
          auditoriums: {
            include: {
              screenings: true,
              seats: {
                include: {
                  tickets: {
                    select: {
                      screeningId: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return theatres.map((theatre) => new TheatreEntity(theatre));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(
          `Failed to fetch theatres with details: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async findOneWithEverything(id: string): Promise<TheatreEntity> {
    try {
      const theatre = await this.prisma.theatre.findUniqueOrThrow({
        where: { id },
        include: {
          auditoriums: {
            include: {
              screenings: true,
              seats: true,
            },
          },
        },
      });
      return new TheatreEntity(theatre);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Theatre with ID ${id} not found`);
        }
        throw new Error(
          `Failed to fetch theatre with details: ${error.message}`,
        );
      }
      throw error;
    }
  }

  async update(
    id: string,
    updateTheatreDto: CreateTheatreDto,
  ): Promise<TheatreEntity> {
    try {
      const { name, location, phone, email, auditoriums } = updateTheatreDto;

      const updatedTheatre = await this.prisma.theatre.update({
        where: { id },
        data: { name, location, phone, email },
      });

      try {
        if (auditoriums.length > 0) {
          const auditoriumPromises = auditoriums.map(async (auditorium) => {
            if (auditorium.id) {
              await this.prisma.auditorium.update({
                where: { id: auditorium.id },
                data: {
                  theatreId: updatedTheatre.id,
                  number: auditorium.number,
                  type: auditorium.type,
                },
              });
            } else {
              await this.createAuditorium(updatedTheatre, auditorium);
            }
          });

          await Promise.all(auditoriumPromises);
        }
      } catch (error) {}
      return new TheatreEntity(updatedTheatre);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Theatre with ID ${id} not found`);
        }
        throw new Error(`Failed to update theatre: ${error.message}`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<TheatreEntity> {
    try {
      const theatre = await this.prisma.theatre.delete({
        where: { id },
      });
      return new TheatreEntity(theatre);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Theatre with ID ${id} not found`);
        }
        throw new Error(`Failed to delete theatre: ${error.message}`);
      }
      throw error;
    }
  }

  private async createAuditorium(
    createdTheatre: TheatreEntity,
    auditorium: CreateAuditoriumInput,
  ) {
    try {
      const createdAuditorium = await this.prisma.auditorium.create({
        data: {
          theatreId: createdTheatre.id,
          number: auditorium.number,
          type: auditorium.type,
        },
      });

      const seatsData = ALL_ROWS.flatMap((row) =>
        Array.from({ length: 18 }).map((_, index) => ({
          auditoriumId: createdAuditorium.id,
          row,
          number: index + 1,
        })),
      );

      const { count } = await this.prisma.seat.createMany({
        data: seatsData,
        skipDuplicates: true, // optional: avoids errors if the same seat is already in DB
      });

      if (count) {
        console.log(
          `Created ${count} seats for auditorium ${createdAuditorium.number}`,
        );
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Failed to create auditorium: ${error.message}`);
      }
      throw error;
    }
  }
}

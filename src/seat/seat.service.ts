import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { SeatEntity } from './entities/seat.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SeatService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSeatDto: CreateSeatDto): Promise<SeatEntity> {
    try {
      const seat = await this.prisma.seat.create({data: createSeatDto});
      return new SeatEntity(seat);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create seat');
    }
  }

  async findAll(): Promise<SeatEntity[]> {
    try {
      const seats = await this.prisma.seat.findMany();
      return seats.map(seat => new SeatEntity(seat));
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch seats');
    }
  }

  async findOne(id: string): Promise<SeatEntity> {
    try {
      const seat = await this.prisma.seat.findUniqueOrThrow({ where: { id } });
      return new SeatEntity(seat);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Seat with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to fetch seat');
    }
  }

  async update(id: string, updateSeatDto: UpdateSeatDto): Promise<SeatEntity> {
    try {
      const seat = await this.prisma.seat.update({ where: { id }, data: updateSeatDto });
      return new SeatEntity(seat);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Seat with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to update seat');
    }
  }

  async remove(id: string): Promise<SeatEntity> {
    try {
      const seat = await this.prisma.seat.delete({ where: { id } });
      return new SeatEntity(seat);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Seat with ID ${id} not found`);
      }
      throw new InternalServerErrorException('Failed to delete seat');
    }
  }
}

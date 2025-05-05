import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ITicketRepository } from '../interfaces/ticket-repository.interface';
import { TicketEntity } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { Prisma } from '@prisma/client';
import { TicketDataDto } from '../dto/data-ticket.dto';

@Injectable()
export class PrismaTicketRepository implements ITicketRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    try {
      const ticket = await this.prisma.ticket.create({
        data: createTicketDto,
      });
      return new TicketEntity(ticket);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('This seat is already booked for this screening');
        }
        throw new Error(`Failed to create ticket: ${error.message}`);
      }
      throw error;
    }
  }

  async findAll(): Promise<TicketEntity[]> {
    try {
      const tickets = await this.prisma.ticket.findMany();
      return tickets.map((ticket) => new TicketEntity(ticket));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Failed to fetch tickets: ${error.message}`);
      }
      throw error;
    }
  }

  async findOne(id: string): Promise<TicketEntity> {
    try {
      const ticket = await this.prisma.ticket.findUniqueOrThrow({
        where: { id },
      });
      return new TicketEntity(ticket);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        throw new Error(`Failed to fetch ticket: ${error.message}`);
      }
      throw error;
    }
  }

  async findOneWithRelations(id: string): Promise<TicketDataDto> {
    try {
      const ticket = await this.prisma.ticket.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          purchasedAt: true,
          refunded: true,
          seat: {
            select: {
              row: true,
              number: true,
              auditorium: {
                select: {
                  number: true,
                  type: true,
                  theatre: {
                    select: {
                      name: true,
                      location: true,
                      phone: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
          screening: {
            select: {
              startTime: true,
              movie: {
                select: {
                  title: true,
                  description: true,
                  tags: true,
                  duration: true,
                },
              },
              auditorium: {
                select: {
                  number: true,
                  type: true,
                  theatre: {
                    select: {
                      name: true,
                      location: true,
                      phone: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return ticket;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        throw new Error(`Failed to fetch ticket data: ${error.message}`);
      }
      throw error;
    }
  }

  async findByUser(userId: string): Promise<TicketEntity[]> {
    try {
      const tickets = await this.prisma.ticket.findMany({
        where: { userId },
      });
      return tickets.map((ticket) => new TicketEntity(ticket));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Failed to fetch user tickets: ${error.message}`);
      }
      throw error;
    }
  }

  async findByScreening(screeningId: string): Promise<TicketEntity[]> {
    try {
      const tickets = await this.prisma.ticket.findMany({
        where: { screeningId },
      });
      return tickets.map((ticket) => new TicketEntity(ticket));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(`Failed to fetch screening tickets: ${error.message}`);
      }
      throw error;
    }
  }

  async update(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<TicketEntity> {
    try {
      const ticket = await this.prisma.ticket.update({
        where: { id },
        data: updateTicketDto,
      });
      return new TicketEntity(ticket);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        throw new Error(`Failed to update ticket: ${error.message}`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<TicketEntity> {
    try {
      const ticket = await this.prisma.ticket.delete({
        where: { id },
      });
      return new TicketEntity(ticket);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        throw new Error(`Failed to delete ticket: ${error.message}`);
      }
      throw error;
    }
  }
}

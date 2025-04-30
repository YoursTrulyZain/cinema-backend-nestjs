import { Inject, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ITicketRepository } from './interfaces/ticket-repository.interface';

@Injectable()
export class TicketService {
  constructor(@Inject('ITicketRepository') private readonly ticketRepository: ITicketRepository) {}

  create(createTicketDto: CreateTicketDto) {
    return this.ticketRepository.create(createTicketDto);
  }

  findAll() {
    return this.ticketRepository.findAll();
  }

  findOne(id: string) {
    return this.ticketRepository.findOne(id);
  }

  findByUser(userId: string) {
    return this.ticketRepository.findByUser(userId);
  }

  findByScreening(screeningId: string) {
    return this.ticketRepository.findByScreening(screeningId);
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    return this.ticketRepository.update(id, updateTicketDto);
  }

  remove(id: string) {
    return this.ticketRepository.remove(id);
  }
}

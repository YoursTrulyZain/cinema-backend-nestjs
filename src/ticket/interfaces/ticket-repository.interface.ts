import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketDataDto } from '../dto/data-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { TicketEntity } from '../entities/ticket.entity';

export interface ITicketRepository {
  create(createTicketDto: CreateTicketDto): Promise<TicketEntity>;
  findAll(): Promise<TicketEntity[]>;
  findOne(id: string): Promise<TicketEntity>;
  findOneWithRelations(id: string): Promise<TicketDataDto>;
  findByUser(userId: string): Promise<TicketEntity[]>;
  findByScreening(screeningId: string): Promise<TicketEntity[]>;
  update(id: string, updateTicketDto: UpdateTicketDto): Promise<TicketEntity>;
  remove(id: string): Promise<TicketEntity>;
}

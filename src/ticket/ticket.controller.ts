import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { TicketDataDto } from './dto/data-ticket.dto';
import { plainToInstance } from 'class-transformer';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get('detail/:id')
  async findOneWithRelations(@Param('id') id: string): Promise<TicketDataDto> {
    const ticket = await this.ticketService.findOneWithRelations(id);
    return plainToInstance(TicketDataDto, ticket);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.ticketService.findByUser(userId);
  }

  @Get('screening/:screeningId')
  findByScreening(@Param('screeningId') screeningId: string) {
    return this.ticketService.findByScreening(screeningId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }
}

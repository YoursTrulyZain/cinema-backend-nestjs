import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaTicketRepository } from './repositories/prisma-ticket.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TicketController],
  providers: [
    TicketService,
    {
      provide: 'ITicketRepository',
      useClass: PrismaTicketRepository,
    }
  ],
})
export class TicketModule {}

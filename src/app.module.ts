import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { TheatreModule } from './theatre/theatre.module';
import { ScreeningModule } from './screening/screening.module';
import { SeatModule } from './seat/seat.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { AuditoriumModule } from './auditorium/auditorium.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [MovieModule, TheatreModule, ScreeningModule, SeatModule, TicketModule, UserModule, AuditoriumModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

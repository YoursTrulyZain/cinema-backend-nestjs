import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { JwtCustomModule } from './jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MovieModule, 
    TheatreModule, 
    ScreeningModule, 
    SeatModule, 
    TicketModule, 
    UserModule, 
    AuditoriumModule, 
    PrismaModule, 
    AuthModule, 
    JwtCustomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

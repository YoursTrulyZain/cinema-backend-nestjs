import { Module } from '@nestjs/common';
import { ScreeningService } from './screening.service';
import { ScreeningController } from './screening.controller';
import { PrismaScreeningRepository } from './repositories/prisma-movie.repository';

@Module({
  controllers: [ScreeningController],
  providers: [
    ScreeningService,
    {
      provide: 'IScreeningRepository',
      useClass: PrismaScreeningRepository,
    }
  ],
})
export class ScreeningModule {}

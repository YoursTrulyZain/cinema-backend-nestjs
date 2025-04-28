import { Module } from '@nestjs/common';
import { TheatreService } from './theatre.service';
import { TheatreController } from './theatre.controller';
import { PrismaTheatreRepository } from './repositories/prisma-theatre.repository';

@Module({
  controllers: [TheatreController],
  providers: [TheatreService,
    {
      provide: 'ITheatreRepository',
      useClass: PrismaTheatreRepository,
    }
  ],
})
export class TheatreModule {}

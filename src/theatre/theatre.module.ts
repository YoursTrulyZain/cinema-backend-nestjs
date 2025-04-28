import { Module } from '@nestjs/common';
import { TheatreService } from './theatre.service';
import { TheatreController } from './theatre.controller';
import { PrismaTheatreRepository } from './repositories/prisma-theatre.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TheatreController],
  providers: [TheatreService,
    {
      provide: 'ITheatreRepository',
      useClass: PrismaTheatreRepository,
    }
  ],
})
export class TheatreModule {}

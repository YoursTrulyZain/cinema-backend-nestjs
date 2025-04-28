import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { PrismaMovieRepository } from './repositories/prisma-movie.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [
    MovieService,
    {
      provide: 'IMovieRepository',
      useClass: PrismaMovieRepository,
    }
  ],
})
export class MovieModule {}

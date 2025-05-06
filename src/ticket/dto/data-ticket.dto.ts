import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';

class TheatreDataDto {
  @IsString()
  name: string;

  @IsString()
  location: string;
}

class AuditoriumDataDto {
  @IsInt()
  number: number;

  @IsString()
  type: string;

  @ValidateNested()
  @Type(() => TheatreDataDto)
  theatre: TheatreDataDto;
}

class SeatDataDto {
  @IsString()
  row: string;

  @IsInt()
  number: number;

  @ValidateNested()
  @Type(() => AuditoriumDataDto)
  auditorium: AuditoriumDataDto;
}

class MovieDataDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  tags: string[]; // No need for decorator unless validating contents

  @IsInt()
  duration: number;
}

class ScreeningDataDto {
  @ValidateNested()
  @Type(() => MovieDataDto)
  movie: MovieDataDto;

  @ValidateNested()
  @Type(() => AuditoriumDataDto)
  auditorium: AuditoriumDataDto;

  @IsDate()
  startTime: Date;
}

export class TicketDataDto {
  @IsString()
  id: string;

  @ValidateNested()
  @Type(() => SeatDataDto)
  seat: SeatDataDto;

  @ValidateNested()
  @Type(() => ScreeningDataDto)
  screening: ScreeningDataDto;

  @IsDate()
  purchasedAt: Date;

  @IsBoolean()
  refunded: boolean;
}

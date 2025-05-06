import { IsArray, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @Type(() => Number)
  @IsInt()
  duration: number;

  @IsString()
  posterUrl: string;
}

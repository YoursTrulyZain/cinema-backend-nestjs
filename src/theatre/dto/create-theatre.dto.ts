import {
  IsArray,
  IsEmail,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAuditoriumInput } from './create-auditorium.input';
import { Type } from 'class-transformer';

export class CreateTheatreDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAuditoriumInput)
  auditoriums: CreateAuditoriumInput[];
}

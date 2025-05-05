import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  userId: string;

  @IsString()
  seatId: string;

  @IsString()
  screeningId: string;

  @IsOptional()
  @IsBoolean()
  refunded?: boolean;
}

import { IsUUID, IsDateString } from 'class-validator';
export class CreateScreeningDto {
    @IsDateString()
    startTime: string;
    @IsUUID()
    movieId: string;
    @IsUUID()
    auditoriumId: string;
}

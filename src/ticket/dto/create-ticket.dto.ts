import { IsBoolean, IsString } from "class-validator";

export class CreateTicketDto {
    @IsString()
    userId: string;

    @IsString()
    seatId: string;

    @IsString()
    screeningId: string;

    @IsBoolean()
    refunded?: boolean;
}

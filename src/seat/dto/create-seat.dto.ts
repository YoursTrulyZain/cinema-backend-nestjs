import { Type } from "class-transformer";
import { IsIn, IsInt, IsString } from "class-validator";
import { ALL_ROWS, Row } from "src/constants/seat";


export class CreateSeatDto {
    @IsString()
    auditoriumId: string;

    @IsIn(ALL_ROWS)
    row: Row

    @Type(() => Number)
    @IsInt()
    number: number;
}

import { IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateMovieDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @Type(() => Number)
    @IsInt()
    duration: number;
}


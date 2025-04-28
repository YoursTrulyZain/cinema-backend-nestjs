import { IsBoolean, IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsPhoneNumber("CA")
    phone?: string;

    @IsBoolean()
    isAdmin?: boolean;
}

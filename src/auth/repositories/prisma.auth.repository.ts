import { PrismaService } from "prisma/prisma.service";
import { IAuthRepository } from "../interfaces/auth.repository.interface";
import { Prisma } from "@prisma/client";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

export class PrismaAuthRepository implements IAuthRepository {
    constructor(private readonly prisma: PrismaService){}

    async validateUser(email: string, password: string) {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({ where: { email }});
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new UnauthorizedException("Invalid password");
            }
            return user;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new NotFoundException(`User with email ${email} not found`)
                }
                throw new Error(`Failed to validate user: ${error.message}`)
            }
            throw error;
        }
    }
}
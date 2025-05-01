import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { IUserRepository } from "../interfaces/user-repository.interface";
import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        try {
            const user = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                },
            });
            return new UserEntity(user);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new Error(`Failed to create user: ${error.message}`);
            }
            throw error;
        }
    }

    async findAll(): Promise<UserEntity[]> {
        try {
            const users = await this.prisma.user.findMany();
            return users.map(user => new UserEntity(user));
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new Error(`Failed to fetch users: ${error.message}`);
            }
            throw error;
        }
    }

    async findById(id: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
            return new UserEntity(user);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException(`User with ID ${id} not found`);
                }
                throw new Error(`Failed to fetch user: ${error.message}`);
            }
            throw error;
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            });
            return new UserEntity(user);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException(`User with ID ${id} not found`);
                }
                throw new Error(`Failed to update user: ${error.message}`);
            }
            throw error;
        }
    }

    async delete(id: string): Promise<UserEntity> {
        try {
            const user = await this.prisma.user.delete({
                where: { id },
            });
            return new UserEntity(user);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException(`User with ID ${id} not found`);
                }
                throw new Error(`Failed to delete user: ${error.message}`);
            }
            throw error;
        }
    }
}


import { PrismaService } from 'src/infra/database/prisma.service';
import { MovementRepository } from '../movement.repository';
import { IResponseMovement } from '../../dto/response-movement.dto';
import { Injectable } from '@nestjs/common';
import { CreateMovementDTO } from '../../dto/create-movement.dto';
import { UpdateMovementDTO } from '../../dto/update-movement.dto';

@Injectable()
export class MovementPrismaRepository implements MovementRepository {
    constructor(private prismaService: PrismaService) {}

    async create(
        { category, type, value, description }: CreateMovementDTO,
        user_id: string,
    ): Promise<IResponseMovement> {
        return this.prismaService.movement.create({
            data: {
                type,
                category,
                value,
                description,
                userId: user_id,
            },
        });
    }

    async update(
        { category, description, value, type }: UpdateMovementDTO,
        id: string,
        user_id: string,
    ): Promise<IResponseMovement> {
        return this.prismaService.movement.update({
            data: {
                category,
                description,
                value,
                type,
            },
            where: { id, userId: user_id },
        });
    }

    async delete(id: string, userId: string): Promise<IResponseMovement> {
        return this.prismaService.movement.delete({ where: { id, userId } });
    }

    async findByIdAndUser(
        id: string,
        userId: string,
    ): Promise<IResponseMovement> {
        return this.prismaService.movement.findUnique({
            where: { id, userId },
        });
    }

    async find(userId: string): Promise<IResponseMovement[]> {
        return this.prismaService.movement.findMany({
            where: { userId },
        });
    }

    async findWithDates(
        userId: string,
        initialDate: string,
        finalDate: string,
    ): Promise<IResponseMovement[]> {
        return this.prismaService.movement.findMany({
            where: {
                userId,
                created_at: {
                    gte: new Date(initialDate).toISOString(),
                    lte: new Date(finalDate).toISOString(),
                },
            },
        });
    }
}

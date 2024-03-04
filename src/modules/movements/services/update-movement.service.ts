import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUpdateMovementDTO } from '../dto/update-movement.dto';

@Injectable()
export class UpdateMovementService {
    constructor(private prismaService: PrismaService) {}

    async execute(
        id: string,
        userId: string,
        { category, type, value, description }: IUpdateMovementDTO,
    ) {
        const movement = await this.prismaService.movement.findUnique({
            where: { id, userId },
        });

        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });

        if (!movement) {
            throw new HttpException(
                'Movement not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        if (type) {
            if (type !== 'REVENUE' && type !== 'EXPENSE') {
                throw new HttpException(
                    'the movement must be of the "REVENUE" or “EXPENSE” type',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        if (type && value) {
            if (type !== movement.type && type === 'EXPENSE') {
                const balance = user.balance - movement.value;
                const newBalance = balance - value;
                await this.prismaService.user.update({
                    data: { balance: newBalance },
                    where: { id: userId },
                });
                await this.prismaService.movement.update({
                    data: {
                        category,
                        description,
                        value,
                        type,
                    },
                    where: { id: movement.id },
                });
                return;
            }

            if (type !== movement.type && type === 'REVENUE') {
                const balance = user.balance + movement.value;
                const newBalance = balance + value;
                await this.prismaService.user.update({
                    data: { balance: newBalance },
                    where: { id: userId },
                });
                await this.prismaService.movement.update({
                    data: {
                        category,
                        description,
                        value,
                        type,
                    },
                    where: { id: movement.id },
                });
                return;
            }
        }

        if (value) {
            if (movement.type === 'EXPENSE') {
                const balance = user.balance + movement.value;
                const newBalance = balance - value;
                console.log(balance, newBalance);
                await this.prismaService.user.update({
                    data: { balance: newBalance },
                    where: { id: userId },
                });
                await this.prismaService.movement.update({
                    data: {
                        category,
                        description,
                        value,
                        type,
                    },
                    where: { id: movement.id },
                });
                return;
            }

            const balance = user.balance - movement.value;
            const newBalance = balance + value;
            await this.prismaService.user.update({
                data: { balance: newBalance },
                where: { id: userId },
            });
            await this.prismaService.movement.update({
                data: {
                    category,
                    description,
                    value,
                    type,
                },
                where: { id: movement.id },
            });
            return;
        }

        if (type && type !== movement.type) {
            if (type === 'EXPENSE') {
                const balance = user.balance - movement.value;
                const newBalance = balance - movement.value;
                await this.prismaService.user.update({
                    data: { balance: newBalance },
                    where: { id: userId },
                });
                await this.prismaService.movement.update({
                    data: {
                        category,
                        description,
                        value,
                        type,
                    },
                    where: { id: movement.id },
                });
                return;
            }

            const balance = user.balance + movement.value;
            const newBalance = balance + movement.value;
            await this.prismaService.user.update({
                data: { balance: newBalance },
                where: { id: userId },
            });
            await this.prismaService.movement.update({
                data: {
                    category,
                    description,
                    value,
                    type,
                },
                where: { id: movement.id },
            });
            return;
        }

        return this.prismaService.movement.update({
            data: {
                category,
                description,
                value,
                type,
            },
            where: { id: movement.id },
        });
    }
}

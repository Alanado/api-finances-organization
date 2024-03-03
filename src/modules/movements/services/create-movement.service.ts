import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ICreateMovementDTO } from '../dto/create-movement.dto';

@Injectable()
export class CreateMovementService {
    constructor(private prismaService: PrismaService) {}

    async execute({
        category,
        type,
        user_id,
        value,
        description,
    }: ICreateMovementDTO) {
        if (type !== 'REVENUE' && type !== 'EXPENSE') {
            throw new HttpException(
                'the movement must be of the "REVENUE" or “EXPENSE” type',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (type === 'REVENUE') {
            const { balance: currentBalance } =
                await this.prismaService.user.findUnique({
                    where: { id: user_id },
                    select: { balance: true },
                });

            await this.prismaService.user.update({
                data: { balance: currentBalance + value },
                where: { id: user_id },
            });

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

        const { balance: currentBalance } =
            await this.prismaService.user.findUnique({
                where: { id: user_id },
                select: { balance: true },
            });

        await this.prismaService.user.update({
            data: { balance: currentBalance - value },
            where: { id: user_id },
        });

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
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class DeleteMovementService {
    constructor(private prismaService: PrismaService) {}

    async execute(id: string, userId: string) {
        const movement = await this.prismaService.movement.findUnique({
            where: { id, userId },
        });

        if (!movement) {
            throw new HttpException(
                'movement not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        const { balance: currentBalance } =
            await this.prismaService.user.findUnique({
                where: { id: userId },
                select: { balance: true },
            });

        await this.prismaService.user.update({
            data: { balance: currentBalance - movement.value },
            where: { id: userId },
        });

        await this.prismaService.movement.delete({ where: { id } });
    }
}

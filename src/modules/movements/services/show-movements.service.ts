import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IQueryParamsDTO } from '../dto/query-params.dto';

@Injectable()
export class ShowMovementsService {
    constructor(private prismaService: PrismaService) {}

    async execute(
        userId: string,
        { finalDate, initialDate, type }: IQueryParamsDTO,
    ) {
        let movements = await this.prismaService.movement.findMany({
            where: { userId },
        });

        if (initialDate && finalDate) {
            movements = await this.prismaService.movement.findMany({
                where: {
                    userId,
                    created_at: {
                        gte: new Date(initialDate).toISOString(),
                        lte: new Date(finalDate).toISOString(),
                    },
                },
            });
        }

        if (type) {
            movements = movements.filter((movement) => {
                return movement.type === type.toUpperCase();
            });
        }

        return movements;
    }
}

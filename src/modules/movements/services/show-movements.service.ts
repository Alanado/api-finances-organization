import { Injectable } from '@nestjs/common';
import { IQueryParamsDTO } from '../dto/query-params.dto';
import { MovementRepository } from '../repository/movement.repository';

@Injectable()
export class ShowMovementsService {
    constructor(private movementRepository: MovementRepository) {}

    async execute(
        userId: string,
        { finalDate, initialDate, type }: IQueryParamsDTO,
    ) {
        let movements = await this.movementRepository.find(userId);

        if (initialDate && finalDate) {
            movements = await this.movementRepository.findWithDates(
                userId,
                initialDate,
                finalDate,
            );
        }

        if (type) {
            movements = movements.filter((movement) => {
                return movement.type === type.toUpperCase();
            });
        }

        return movements;
    }
}

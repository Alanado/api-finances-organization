import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovementRepository } from '../repository/movement.repository';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { CreateMovementDTO } from '../dto/create-movement.dto';

@Injectable()
export class CreateMovementService {
    constructor(
        private movementRepository: MovementRepository,
        private userRepository: UserRepository,
    ) {}

    async execute(
        user_id: string,
        { category, type, value, description }: CreateMovementDTO,
    ) {
        if (type !== 'REVENUE' && type !== 'EXPENSE') {
            throw new HttpException(
                'the movement must be of the "REVENUE" or “EXPENSE” type',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (type === 'REVENUE') {
            const { balance: currentBalance } =
                await this.userRepository.findById(user_id);

            await this.userRepository.updateBalance(
                user_id,
                currentBalance + value,
            );

            return this.movementRepository.create(
                {
                    type,
                    category,
                    value,
                    description,
                },
                user_id,
            );
        }

        const { balance: currentBalance } =
            await this.userRepository.findById(user_id);

        await this.userRepository.updateBalance(
            user_id,
            currentBalance - value,
        );

        return this.movementRepository.create(
            {
                type,
                category,
                value,
                description,
            },
            user_id,
        );
    }
}

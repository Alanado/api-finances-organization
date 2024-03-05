import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUpdateMovementDTO } from '../dto/update-movement.dto';
import { MovementRepository } from '../repository/movement.repository';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

@Injectable()
export class UpdateMovementService {
    constructor(
        private movementRepository: MovementRepository,
        private userRepository: UserRepository,
    ) {}

    async execute(
        id: string,
        userId: string,
        { category, type, value, description }: IUpdateMovementDTO,
    ) {
        const movement = await this.movementRepository.findByIdAndUser(
            id,
            userId,
        );

        const user = await this.userRepository.findById(userId);

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
                await this.userRepository.updateBalance(userId, newBalance);
                await this.movementRepository.update(
                    {
                        category,
                        description,
                        value,
                        type,
                        user_id: userId,
                    },
                    id,
                );

                return;
            }

            if (type !== movement.type && type === 'REVENUE') {
                const balance = user.balance + movement.value;
                const newBalance = balance + value;
                await this.userRepository.updateBalance(userId, newBalance);
                await this.movementRepository.update(
                    {
                        category,
                        description,
                        value,
                        type,
                        user_id: userId,
                    },
                    id,
                );

                return;
            }
        }

        if (value) {
            if (movement.type === 'EXPENSE') {
                const balance = user.balance + movement.value;
                const newBalance = balance - value;
                await this.userRepository.updateBalance(userId, newBalance);
                await this.movementRepository.update(
                    {
                        category,
                        description,
                        value,
                        type,
                        user_id: userId,
                    },
                    id,
                );
                return;
            }

            const balance = user.balance - movement.value;
            const newBalance = balance + value;
            await this.userRepository.updateBalance(userId, newBalance);
            await this.movementRepository.update(
                {
                    category,
                    description,
                    value,
                    type,
                    user_id: userId,
                },
                id,
            );
            return;
        }

        if (type && type !== movement.type) {
            if (type === 'EXPENSE') {
                const balance = user.balance - movement.value;
                const newBalance = balance - movement.value;
                await this.userRepository.updateBalance(userId, newBalance);
                await this.movementRepository.update(
                    {
                        category,
                        description,
                        value,
                        type,
                        user_id: userId,
                    },
                    id,
                );
                return;
            }

            const balance = user.balance + movement.value;
            const newBalance = balance + movement.value;
            await this.userRepository.updateBalance(userId, newBalance);
            await this.movementRepository.update(
                {
                    category,
                    description,
                    value,
                    type,
                    user_id: userId,
                },
                id,
            );
            return;
        }

        return this.movementRepository.update(
            {
                category,
                description,
                value,
                type,
                user_id: userId,
            },
            id,
        );
    }
}

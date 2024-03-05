import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MovementRepository } from '../repository/movement.repository';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

@Injectable()
export class DeleteMovementService {
    constructor(
        private movementRepository: MovementRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async execute(id: string, userId: string) {
        const movement = await this.movementRepository.findByIdAndUser(
            id,
            userId,
        );

        if (!movement) {
            throw new HttpException(
                'movement not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        const { balance: currentBalance } =
            await this.userRepository.findById(userId);

        await this.userRepository.updateBalance(
            userId,
            currentBalance - movement.value,
        );

        await this.movementRepository.delete(id, userId);
    }
}

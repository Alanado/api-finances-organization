import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class ShowBalanceService {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string) {
        const { balance } = await this.userRepository.findById(id);

        return { balance: 'R$ ' + (balance / 100).toFixed(2) };
    }
}

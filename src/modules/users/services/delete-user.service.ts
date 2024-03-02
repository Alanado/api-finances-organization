import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class DeleteUserService {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new HttpException('user not found.', HttpStatus.NOT_FOUND);
        }

        await this.userRepository.delete(id);
    }
}

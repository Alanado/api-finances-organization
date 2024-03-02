import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICreateUSerDTO } from '../dto/create-user.dto';
import { hash } from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserService {
    constructor(private userRepository: UserRepository) {}

    async execute({ name, email, password }: ICreateUSerDTO) {
        const userExist = await this.userRepository.findByEmail(email);

        if (userExist) {
            throw new HttpException(
                'email already used.',
                HttpStatus.BAD_REQUEST,
            );
        }
        const passwordHashed = await hash(password, 8);

        return this.userRepository.create({
            name,
            email,
            password: passwordHashed,
        });
    }
}

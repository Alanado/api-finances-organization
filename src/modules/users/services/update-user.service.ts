import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUpdateUserDTO } from '../dto/update-user.dto';
import { hash } from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UpdateUserService {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, { name, email, password }: IUpdateUserDTO) {
        const user = await this.userRepository.findById(id);

        if (email && email !== user.email) {
            const emailExist = await this.userRepository.findByEmail(email);
            if (emailExist) {
                throw new HttpException(
                    'email already used.',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const passwordHashed = password
            ? await hash(password, 8)
            : user.password;

        await this.userRepository.update(id, {
            name,
            email,
            password: passwordHashed,
        });
    }
}

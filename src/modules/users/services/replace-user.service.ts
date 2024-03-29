import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReplaceUserDTO } from '../dto/replace-user.dto';
import { hash } from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class ReplaceUserService {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, { name, email, password }: ReplaceUserDTO) {
        const user = await this.userRepository.findById(id);

        if (email !== user.email) {
            const emailExist = await this.userRepository.findByEmail(email);

            if (emailExist) {
                console.log(emailExist);

                throw new HttpException(
                    'email already used.',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const passwordHashed = await hash(password, 8);

        await this.userRepository.update(id, {
            name,
            email,
            password: passwordHashed,
        });
    }
}

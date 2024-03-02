import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ILoginDTO } from '../dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/users/repositories/user.repository';

@Injectable()
export class LoginService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async execute({ email, password }: ILoginDTO) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const isEqualPassword = await compare(password, user.password);

        if (!isEqualPassword) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.id,
            email: user.email,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

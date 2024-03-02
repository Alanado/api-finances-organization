import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ILoginDTO } from '../dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {}

    async execute({ email, password }: ILoginDTO) {
        const user = await this.prismaService.user.findUnique({
            where: { email },
        });

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

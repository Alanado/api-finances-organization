import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { ICreateUSerDTO } from '../dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class CreateUserService {
    constructor(private prismaService: PrismaService) {}

    async execute({ name, email, password }: ICreateUSerDTO) {
        const userExist = await this.prismaService.user.findUnique({
            where: { email },
        });

        if (userExist) {
            throw new HttpException(
                'email already used.',
                HttpStatus.BAD_REQUEST,
            );
        }
        const passwordHashed = await hash(password, 8);

        return this.prismaService.user.create({
            data: {
                name,
                email,
                password: passwordHashed,
            },
        });
    }
}

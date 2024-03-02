import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUpdateUserDTO } from '../dto/update-user.dto';
import { PrismaService } from 'src/providers/database/PrismaService';
import { hash } from 'bcrypt';

@Injectable()
export class UpdateUserService {
    constructor(private prismaService: PrismaService) {}

    async execute(id: string, { name, email, password }: IUpdateUserDTO) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (email && email !== user.email) {
            const emailExist = await this.prismaService.user.findUnique({
                where: { email },
            });
            if (emailExist) {
                throw new HttpException(
                    'email already used.',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const PasswordHashed = password
            ? await hash(password, 8)
            : user.password;

        await this.prismaService.user.update({
            data: {
                name,
                email,
                password: PasswordHashed,
            },
            where: { id },
        });
    }
}

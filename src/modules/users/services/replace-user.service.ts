import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';
import { IReplaceUserDTO } from '../dto/replace-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class ReplaceUserService {
    constructor(private prismaService: PrismaService) {}

    async execute(id: string, { name, email, password }: IReplaceUserDTO) {
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (email !== user.email) {
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

        const PasswordHashed = await hash(password, 8);

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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class DeleteUserService {
    constructor(private prismaSevice: PrismaService) {}

    async execute(id: string) {
        const user = await this.prismaSevice.user.findUnique({ where: { id } });

        if (!user) {
            throw new HttpException('user not found.', HttpStatus.NOT_FOUND);
        }

        await this.prismaSevice.user.delete({ where: { id } });
    }
}

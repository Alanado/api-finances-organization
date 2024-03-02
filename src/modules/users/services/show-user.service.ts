import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/PrismaService';

@Injectable()
export class ShowUserService {
    constructor(private prismaService: PrismaService) {}

    async execute(id: string) {
        return this.prismaService.user.findUnique({ where: { id } });
    }
}

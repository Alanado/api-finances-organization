import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import { ICreateUSerDTO } from '../../dto/create-user.dto';
import { IResponseUser } from '../../dto/response-user.dto';
import { IUpdateUserDTO } from '../../dto/update-user.dto';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class UserPrismaRepository implements UserRepository {
    constructor(private prismaService: PrismaService) {}

    async create({
        name,
        email,
        password,
    }: ICreateUSerDTO): Promise<IResponseUser> {
        return this.prismaService.user.create({
            data: {
                name,
                email,
                password,
            },
        });
    }
    async findByEmail(email: string): Promise<IResponseUser> {
        return this.prismaService.user.findUnique({
            where: { email },
        });
    }
    async findById(id: string): Promise<IResponseUser> {
        return this.prismaService.user.findUnique({ where: { id } });
    }
    async update(
        id: string,
        { name, email, password }: IUpdateUserDTO,
    ): Promise<IResponseUser> {
        return this.prismaService.user.update({
            data: {
                name,
                email,
                password,
            },
            where: { id },
        });
    }
    async delete(id: string): Promise<IResponseUser> {
        return this.prismaService.user.delete({ where: { id } });
    }
}

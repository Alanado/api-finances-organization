import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { UpdateUserService } from './services/update-user.service';
import { ReplaceUserService } from './services/replace-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { ShowUserService } from './services/show-user.service';
import { UserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { ShowBalanceService } from './services/show-balance.service';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
    controllers: [UserController],
    providers: [
        PrismaService,
        CreateUserService,
        UpdateUserService,
        ReplaceUserService,
        DeleteUserService,
        ShowUserService,
        ShowBalanceService,
        { provide: UserRepository, useClass: UserPrismaRepository },
        { provide: APP_PIPE, useClass: ZodValidationPipe },
    ],
    imports: [],
})
export class UserModule {}

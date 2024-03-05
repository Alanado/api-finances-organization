import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { LoginService } from './services/login.service';
import { UserRepository } from '../users/repositories/user.repository';
import { UserPrismaRepository } from '../users/repositories/prisma/user.prisma.repository';
import { LoginController } from './login.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
    controllers: [LoginController],
    providers: [
        PrismaService,
        LoginService,
        { provide: UserRepository, useClass: UserPrismaRepository },
        { provide: APP_PIPE, useClass: ZodValidationPipe },
    ],
    imports: [
        JwtModule.register({
            global: true,
            privateKey: process.env.SECRET,
            signOptions: { expiresIn: '10h' },
        }),
    ],
})
export class LoginModule {}

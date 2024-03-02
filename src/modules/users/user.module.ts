import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { UpdateUserService } from './services/update-user.service';
import { ReplaceUserService } from './services/replace-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { ShowUserService } from './services/show-user.service';
import { UserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';

@Module({
    controllers: [UserController],
    providers: [
        CreateUserService,
        UpdateUserService,
        ReplaceUserService,
        DeleteUserService,
        ShowUserService,
        { provide: UserRepository, useClass: UserPrismaRepository },
    ],
    imports: [],
})
export class UserModule {}

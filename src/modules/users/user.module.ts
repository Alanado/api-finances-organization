import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { UpdateUserService } from './services/update-user.service';
import { ReplaceUserService } from './services/replace-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { ShowUserService } from './services/show-user.service';

@Module({
    controllers: [UserController],
    providers: [
        CreateUserService,
        UpdateUserService,
        ReplaceUserService,
        DeleteUserService,
        ShowUserService,
    ],
    imports: [],
})
export class UserModule {}

import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { ICreateUSerDTO } from './dto/create-user.dto';
import { UpdateUserService } from './services/update-user.service';
import { IUpdateUserDTO } from './dto/update-user.dto';
import { ReplaceUserService } from './services/replace-user.service';
import { IReplaceUserDTO } from './dto/replace-user.dto';
import { DeleteUserService } from './services/delete-user.service';
import { ShowUserService } from './services/show-user.service';
import { AuthGuard } from 'src/infra/providers/auth.guard';

@Controller('/user')
export class UserController {
    constructor(
        private readonly createUser: CreateUserService,
        private readonly updateUser: UpdateUserService,
        private readonly replaceUser: ReplaceUserService,
        private readonly deleteUser: DeleteUserService,
        private readonly showUser: ShowUserService,
    ) {}

    @Post()
    async create(@Body() data: ICreateUSerDTO) {
        return this.createUser.execute({ ...data });
    }

    @UseGuards(AuthGuard)
    @Get()
    async show(@Request() req) {
        return await this.showUser.execute(req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Patch()
    async update(@Body() data: IUpdateUserDTO, @Request() req) {
        return await this.updateUser.execute(req.user.sub, { ...data });
    }

    @UseGuards(AuthGuard)
    @Put()
    async replace(@Body() data: IReplaceUserDTO, @Request() req) {
        return await this.replaceUser.execute(req.user.sub, { ...data });
    }

    @UseGuards(AuthGuard)
    @Delete()
    async delete(@Request() req) {
        return await this.deleteUser.execute(req.user.id);
    }
}

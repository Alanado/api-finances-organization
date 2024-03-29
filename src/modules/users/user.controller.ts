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
import { UpdateUserService } from './services/update-user.service';
import { ReplaceUserService } from './services/replace-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { ShowUserService } from './services/show-user.service';
import { AuthGuard } from 'src/infra/providers/auth.guard';
import { ShowBalanceService } from './services/show-balance.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ReplaceUserDTO } from './dto/replace-user.dto';
import { ResponseUserController } from './dto/response-user-controller.dto';

@Controller('/user')
export class UserController {
    constructor(
        private readonly createUser: CreateUserService,
        private readonly updateUser: UpdateUserService,
        private readonly replaceUser: ReplaceUserService,
        private readonly deleteUser: DeleteUserService,
        private readonly showUser: ShowUserService,
        private readonly showBalance: ShowBalanceService,
    ) {}

    @Post()
    async create(@Body() data: CreateUserDTO) {
        const user = await this.createUser.execute({ ...data });
        return ResponseUserController.parse(user);
    }

    @UseGuards(AuthGuard)
    @Get()
    async show(@Request() req) {
        const user = await this.showUser.execute(req.user.sub);
        return ResponseUserController.parse(user);
    }

    @UseGuards(AuthGuard)
    @Get('/balance')
    async getBalance(@Request() req) {
        return this.showBalance.execute(req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Patch()
    async update(@Body() data: UpdateUserDTO, @Request() req) {
        return await this.updateUser.execute(req.user.sub, { ...data });
    }

    @UseGuards(AuthGuard)
    @Put()
    async replace(@Body() data: ReplaceUserDTO, @Request() req) {
        return await this.replaceUser.execute(req.user.sub, { ...data });
    }

    @UseGuards(AuthGuard)
    @Delete()
    async delete(@Request() req) {
        return await this.deleteUser.execute(req.user.id);
    }
}

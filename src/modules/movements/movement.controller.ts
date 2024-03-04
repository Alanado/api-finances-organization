import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CreateMovementService } from './services/create-movement.service';
import { ICreateMovementDTO } from './dto/create-movement.dto';
import { AuthGuard } from 'src/infra/providers/auth.guard';
import { IUpdateMovementDTO } from './dto/update-movement.dto';
import { UpdateMovementService } from './services/update-movement.service';
import { ShowMovementsService } from './services/show-movements.service';
import { IQueryParamsDTO } from './dto/query-params.dto';
import { DeleteMovementService } from './services/delete-movement.service';

@Controller('/movement')
export class MovementController {
    constructor(
        private readonly createMovement: CreateMovementService,
        private readonly updateMovement: UpdateMovementService,
        private readonly showmMovement: ShowMovementsService,
        private readonly deleteMovement: DeleteMovementService,
    ) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() data: ICreateMovementDTO, @Request() req) {
        return this.createMovement.execute({ user_id: req.user.sub, ...data });
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    async update(
        @Body() data: IUpdateMovementDTO,
        @Request() req,
        @Param('id') id: string,
    ) {
        await this.updateMovement.execute(id, req.user.sub, { ...data });
        return;
    }

    @UseGuards(AuthGuard)
    @Get()
    async show(@Request() req, @Query() query: IQueryParamsDTO) {
        return this.showmMovement.execute(req.user.sub, { ...query });
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async delete(@Request() req, @Param('id') id: string) {
        await this.deleteMovement.execute(id, req.user.sub);
        return;
    }
}

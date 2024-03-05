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
import { AuthGuard } from 'src/infra/providers/auth.guard';
import { UpdateMovementService } from './services/update-movement.service';
import { ShowMovementsService } from './services/show-movements.service';
import { IQueryParamsDTO } from './dto/query-params.dto';
import { DeleteMovementService } from './services/delete-movement.service';
import { CreateMovementDTO } from './dto/create-movement.dto';
import { UpdateMovementDTO } from './dto/update-movement.dto';

@Controller('/movement')
export class MovementController {
    constructor(
        private readonly createMovement: CreateMovementService,
        private readonly updateMovement: UpdateMovementService,
        private readonly showMovement: ShowMovementsService,
        private readonly deleteMovement: DeleteMovementService,
    ) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() data: CreateMovementDTO, @Request() req) {
        return this.createMovement.execute(req.user.sub, { ...data });
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    async update(
        @Body() data: UpdateMovementDTO,
        @Request() req,
        @Param('id') id: string,
    ) {
        await this.updateMovement.execute(id, req.user.sub, { ...data });
        return;
    }

    @UseGuards(AuthGuard)
    @Get()
    async show(@Request() req, @Query() query: IQueryParamsDTO) {
        return this.showMovement.execute(req.user.sub, { ...query });
    }

    @UseGuards(AuthGuard)
    @Delete('/:id')
    async delete(@Request() req, @Param('id') id: string) {
        return await this.deleteMovement.execute(id, req.user.sub);
    }
}

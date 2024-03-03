import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateMovementService } from './services/create-movement.service';
import { ICreateMovementDTO } from './dto/create-movement.dto';
import { AuthGuard } from 'src/infra/providers/auth.guard';

@Controller('/movement')
export class MovementController {
    constructor(private readonly createMovement: CreateMovementService) {}

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() data: ICreateMovementDTO, @Request() req) {
        return this.createMovement.execute({ user_id: req.user.sub, ...data });
    }
}

import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateMovementService } from './services/create-movement.service';
import { UpdateMovementService } from './services/update-movement.service';
import { ShowMovementsService } from './services/show-movements.service';

@Module({
    controllers: [MovementController],
    providers: [
        PrismaService,
        CreateMovementService,
        UpdateMovementService,
        ShowMovementsService,
    ],
    imports: [],
})
export class MovementModule {}

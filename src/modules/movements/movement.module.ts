import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateMovementService } from './services/create-movement.service';
import { UpdateMovementService } from './services/update-movement.service';

@Module({
    controllers: [MovementController],
    providers: [PrismaService, CreateMovementService, UpdateMovementService],
    imports: [],
})
export class MovementModule {}

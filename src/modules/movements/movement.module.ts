import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateMovementService } from './services/create-movement.service';

@Module({
    controllers: [MovementController],
    providers: [PrismaService, CreateMovementService],
    imports: [],
})
export class MovementModule {}

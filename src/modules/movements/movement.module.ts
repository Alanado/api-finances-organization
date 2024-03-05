import { Module } from '@nestjs/common';
import { MovementController } from './movement.controller';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateMovementService } from './services/create-movement.service';
import { UpdateMovementService } from './services/update-movement.service';
import { ShowMovementsService } from './services/show-movements.service';
import { DeleteMovementService } from './services/delete-movement.service';
import { MovementRepository } from './repository/movement.repository';
import { MovementPrismaRepository } from './repository/prisma/movement.prisma.repository';
import { UserRepository } from '../users/repositories/user.repository';
import { UserPrismaRepository } from '../users/repositories/prisma/user.prisma.repository';

@Module({
    controllers: [MovementController],
    providers: [
        PrismaService,
        CreateMovementService,
        UpdateMovementService,
        ShowMovementsService,
        DeleteMovementService,
        { provide: MovementRepository, useClass: MovementPrismaRepository },
        { provide: UserRepository, useClass: UserPrismaRepository },
    ],
    imports: [],
})
export class MovementModule {}

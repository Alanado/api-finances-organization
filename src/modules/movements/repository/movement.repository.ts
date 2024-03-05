import { CreateMovementDTO } from '../dto/create-movement.dto';
import { IResponseMovement } from '../dto/response-movement.dto';
import { UpdateMovementDTO } from '../dto/update-movement.dto';

export abstract class MovementRepository {
    abstract create(
        data: CreateMovementDTO,
        user_id: string,
    ): Promise<IResponseMovement>;
    abstract update(
        data: UpdateMovementDTO,
        id: string,
        user_id: string,
    ): Promise<IResponseMovement>;
    abstract delete(id: string, userId: string): Promise<IResponseMovement>;
    abstract findByIdAndUser(
        id: string,
        userId: string,
    ): Promise<IResponseMovement>;
    abstract find(userId: string): Promise<IResponseMovement[]>;
    abstract findWithDates(
        userId: string,
        initialDate: string,
        finalDate: string,
    ): Promise<IResponseMovement[]>;
}

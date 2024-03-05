import { CreateUserDTO } from '../dto/create-user.dto';
import { IResponseUser } from '../dto/response-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

export abstract class UserRepository {
    abstract create(data: CreateUserDTO): Promise<IResponseUser>;
    abstract findByEmail(email: string): Promise<IResponseUser>;
    abstract findById(id: string): Promise<IResponseUser>;
    abstract update(id: string, data: UpdateUserDTO): Promise<IResponseUser>;
    abstract updateBalance(id: string, balance: number): Promise<IResponseUser>;
    abstract delete(id: string): Promise<IResponseUser>;
}

import { ICreateUSerDTO } from '../dto/create-user.dto';
import { IResponseUser } from '../dto/response-user.dto';
import { IUpdateUserDTO } from '../dto/update-user.dto';

export abstract class UserRepository {
    abstract create(data: ICreateUSerDTO): Promise<IResponseUser>;
    abstract findByEmail(email: string): Promise<IResponseUser>;
    abstract findById(id: string): Promise<IResponseUser>;
    abstract update(id: string, data: IUpdateUserDTO): Promise<IResponseUser>;
    abstract delete(id: string): Promise<IResponseUser>;
}

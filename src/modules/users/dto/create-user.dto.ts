import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string({ required_error: 'name must be a string' }),
    email: z
        .string({ required_error: 'email must be a string' })
        .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'password must be a string' }),
});

export class CreateUserDTO extends createZodDto(createUserSchema) {}

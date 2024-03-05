import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

const updateUserSchema = z.object({
    name: z.string({ required_error: 'name must be a string' }).optional(),
    email: z
        .string({ required_error: 'email must be a string' })
        .email({ message: 'Invalid email address' })
        .optional(),
    password: z
        .string({ required_error: 'password must be a string' })
        .optional(),
});

export class UpdateUserDTO extends createZodDto(updateUserSchema) {}

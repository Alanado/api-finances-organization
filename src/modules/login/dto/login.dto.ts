import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const loginSchema = z.object({
    email: z
        .string({ required_error: 'email must be a string' })
        .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'password must be a string' }),
});

export class LoginDTO extends createZodDto(loginSchema) {}

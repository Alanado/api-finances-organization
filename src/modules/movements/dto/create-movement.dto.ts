import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createUserSchema = z.object({
    type: z.enum(['REVENUE', 'EXPENSE'], {
        required_error: 'type must be "REVENUE" or "EXPENSE" ',
    }),
    value: z
        .number({ required_error: 'value must be a number' })
        .positive({ message: 'Invalid value ' }),
    category: z.string({ required_error: 'category must be a string' }),
    description: z
        .string({ required_error: 'description must be a string' })
        .optional(),
});

export class CreateMovementDTO extends createZodDto(createUserSchema) {}

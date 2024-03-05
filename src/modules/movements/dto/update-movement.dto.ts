import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const updateUserSchema = z.object({
    type: z
        .enum(['REVENUE', 'EXPENSE'], {
            required_error: 'type must be "REVENUE" or "EXPENSE" ',
        })
        .optional(),
    value: z
        .number({ required_error: 'value must be a number' })
        .positive({ message: 'Invalid value ' })
        .optional(),
    category: z
        .string({ required_error: 'category must be a string' })
        .optional(),
    description: z
        .string({ required_error: 'description must be a string' })
        .optional()
        .optional(),
});

export class UpdateMovementDTO extends createZodDto(updateUserSchema) {}

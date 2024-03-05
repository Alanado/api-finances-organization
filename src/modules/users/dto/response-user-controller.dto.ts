import { z } from 'zod';
import { createUserSchema } from './create-user.dto';

export const ResponseUserController = createUserSchema
    .extend({ id: z.string() })
    .omit({ password: true });

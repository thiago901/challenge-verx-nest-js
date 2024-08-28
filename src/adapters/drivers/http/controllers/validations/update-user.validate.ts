import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export type UpdateUserProps = z.infer<typeof updateUserSchema>;

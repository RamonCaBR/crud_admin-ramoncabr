import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean().optional(),
});

export const createUserSchema = userSchema.omit({ id: true });

export const UserRes = userSchema.omit({ id: true, password: true });

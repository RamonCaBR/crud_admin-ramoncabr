import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().max(120),
  admin: z.boolean().optional(),
});

export const createUserSchema = userSchema.omit({ id: true });

export const UserRes = userSchema.omit({ id: true, password: true });

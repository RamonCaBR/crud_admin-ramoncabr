import { z } from "zod";
import { userSchema } from "../schemas/user.schema";

export type User = z.infer<typeof userSchema>;

export type QueryExists = {
  exists: boolean;
};

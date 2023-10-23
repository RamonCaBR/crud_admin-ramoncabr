import { z } from "zod";
import { sessionSchema } from "../schemas/session.schema";

export type Session = z.infer<typeof sessionSchema>;

export type Token = {
  token: string;
};

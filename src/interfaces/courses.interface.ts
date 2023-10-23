import { z } from "zod";
import { courseSchema, createUserSchema } from "../schemas/courses.schema";

export type Course = z.infer<typeof courseSchema>;

export type CreateCourse = z.infer<typeof createUserSchema>;

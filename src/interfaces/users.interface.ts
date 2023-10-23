import { z } from "zod";
import { UserRes, createUserSchema, userSchema } from "../schemas/user.schema";

export type User = z.infer<typeof userSchema>;

export type CreateUser = z.infer<typeof createUserSchema>;

export type UserRes = z.infer<typeof UserRes>;

export type UserCoursesRes = {
  courseId: number;
  courseName: string;
  courseDescription: string;
  userActiveInCourse: boolean;
  userId: number;
  userName: string;
};

export type QueryExists = {
  exists: boolean;
};

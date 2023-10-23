import { Router } from "express";
import { bodyValidation } from "../middlewares/bodyValidation.middleware";
import { createUserSchema } from "../schemas/user.schema";

export const usersRoutes: Router = Router();

usersRoutes.post("/users", bodyValidation(createUserSchema));

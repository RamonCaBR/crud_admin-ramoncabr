import { Router } from "express";
import { bodyValidation } from "../middlewares/bodyValidation.middleware";
import { createUserSchema } from "../schemas/user.schema";
import { verfiyIfEmailExists } from "../middlewares/verfiyIfEmailExists.middleware";
import { createUserController } from "../controllers/users.controller";
import { tokenValidation } from "../middlewares/tokenValidation.middleware";
import { createSessionController } from "../controllers/session.controller";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "/users",
  bodyValidation(createUserSchema),
  verfiyIfEmailExists,
  createUserController
);

usersRoutes.post("/login", createSessionController);

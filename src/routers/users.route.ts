import { Router } from "express";
import { bodyValidation } from "../middlewares/bodyValidation.middleware";
import { verfiyIfEmailExists } from "../middlewares/verfiyIfEmailExists.middleware";
import { tokenValidation } from "../middlewares/tokenValidation.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { createUserSchema } from "../schemas/user.schema";
import { sessionSchema } from "../schemas/session.schema";
import {
  createUserController,
  getAllUsersController,
} from "../controllers/users.controller";
import { createSessionController } from "../controllers/session.controller";
import { isUserRegistered } from "../middlewares/isUserRegistered.middleware";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "/users",
  bodyValidation(createUserSchema),
  verfiyIfEmailExists,
  createUserController
);
usersRoutes.post(
  "/login",
  bodyValidation(sessionSchema),
  createSessionController
);

usersRoutes.use(tokenValidation);

usersRoutes.get("/users", isAdmin, getAllUsersController);
usersRoutes.get("/users/:id/courses", isAdmin, isUserRegistered);

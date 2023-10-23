import { Router } from "express";
import { bodyValidation } from "../middlewares/bodyValidation.middleware";
import { createUserSchema } from "../schemas/user.schema";
import { verfiyIfEmailExists } from "../middlewares/verfiyIfEmailExists.middleware";
import { createUserController } from "../controllers/users.controller";
import { createSessionController } from "../controllers/session.controller";
import { sessionSchema } from "../schemas/session.schema";
import { tokenValidation } from "../middlewares/tokenValidation.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

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

usersRoutes.get("/users", isAdmin);

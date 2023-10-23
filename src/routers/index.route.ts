import { Router } from "express";
import { usersRoutes } from "./users.route";

export const routes: Router = Router();

routes.use("/", usersRoutes);

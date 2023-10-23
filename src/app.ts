import "express-async-errors";
import express, { Application, json } from "express";
import { handleError } from "./middlewares/handleError.middleware";
import { routes } from "./routers/index.route";

const app: Application = express();

app.use(json());

app.use("/", routes);

app.use(handleError);

export default app;

import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const bodyValidation =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    schema.parse(req.body);

    return next();
  };

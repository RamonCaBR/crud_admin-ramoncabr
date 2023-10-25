import { NextFunction, Request, Response } from "express";
import AppError from "../errors/App.error";
import { verify } from "jsonwebtoken";

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) throw new AppError("Missing bearer token", 401);

  const [_bearer, token] = authorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) throw new AppError(error.message, 401);

    res.locals.email = decoded.email;
  });

  return next();
};

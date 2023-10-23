import { Request, Response, NextFunction } from "express";
import AppError from "../errors/App.error";
import { ZodError } from "zod";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({ message: err.message });

  if (err instanceof ZodError)
    return res.status(400).json(err.flatten().fieldErrors);

  return res.status(500).json({ message: "Server internal error" });
};

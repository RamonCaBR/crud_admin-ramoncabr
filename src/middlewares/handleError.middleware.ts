import { Request, Response, NextFunction } from "express";
import AppError from "../errors/App.error";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Server internal error" });
};

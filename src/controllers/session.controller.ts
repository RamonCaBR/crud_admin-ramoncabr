import { Request, Response } from "express";
import { createSessionService } from "../services/session.service";

export const createSessionController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = await createSessionService(req.body);

  return res.status(200).json({ token });
};

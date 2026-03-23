import { NextFunction, Request, Response } from "express";
import { ClientError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envs";

const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
  const raw = req.headers.authorization;
  if (!raw) {
    return next(new ClientError("Token is required"));
  }

  const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.body.userId = decoded.userId;
  } catch (error) {
    next(new ClientError("Invalid token"));
  }

  next();
};

export default checkLogin;

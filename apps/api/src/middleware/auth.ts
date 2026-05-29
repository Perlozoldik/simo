import type { Request, RequestHandler } from "express";
import { verifyAccessToken, AccessTokenPayload } from "../utils/jwt";
import { forbidden, unauthorized } from "../utils/http";
import type { Role } from "@prisma/client";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

function extractToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice(7);
  if (typeof req.query.token === "string") return req.query.token;
  return null;
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = extractToken(req);
  if (!token) return next(unauthorized("Missing access token"));
  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(unauthorized("Invalid or expired token"));
  }
};

export const requireRole = (...roles: Role[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) return next(unauthorized());
    if (!roles.includes(req.user.role))
      return next(forbidden("Insufficient role"));
    next();
  };
};

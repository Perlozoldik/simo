import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";
import { HttpError } from "../utils/http";
import { logger } from "../utils/logger";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ message: "Route not found", code: "NOT_FOUND" });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      details: err.flatten(),
    });
  }
  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ message: err.message, code: err.code, details: err.details });
  }
  logger.error({ err }, "unhandled error");
  res.status(500).json({ message: "Internal server error", code: "INTERNAL" });
};

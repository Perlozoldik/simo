import pino from "pino";
import { env, isProd } from "../config/env";

export const logger = pino({
  level: isProd ? "info" : "debug",
  transport: isProd
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
  base: { service: "velora-api", env: env.NODE_ENV },
});

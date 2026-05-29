import Redis from "ioredis";
import { env } from "./env";
import { logger } from "../utils/logger";

export const redis = new Redis(env.REDIS_URL, {
  lazyConnect: true,
  maxRetriesPerRequest: 3,
});

redis.on("error", (err) => logger.error({ err }, "redis error"));

export async function connectRedis() {
  if (redis.status === "ready" || redis.status === "connecting") return;
  try {
    await redis.connect();
    logger.info("redis connected");
  } catch (err) {
    logger.warn({ err }, "redis connect failed (continuing without cache)");
  }
}

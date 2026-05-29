import http from "node:http";
import { createApp } from "./server";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { connectRedis } from "./config/redis";
import { attachSocket } from "./sockets";

async function main() {
  const app = createApp();
  const server = http.createServer(app);
  attachSocket(server);
  await connectRedis();

  server.listen(env.PORT, () => {
    logger.info(
      { port: env.PORT, env: env.NODE_ENV },
      "velora-api listening"
    );
  });

  const shutdown = (signal: string) => {
    logger.info({ signal }, "shutting down");
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10_000).unref();
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

main().catch((err) => {
  logger.error({ err }, "fatal startup error");
  process.exit(1);
});

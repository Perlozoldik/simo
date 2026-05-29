import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import { generalLimiter } from "./middleware/rateLimit";
import { errorHandler, notFoundHandler } from "./middleware/error";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import rideRoutes from "./routes/ride.routes";
import driverRoutes from "./routes/driver.routes";
import paymentRoutes from "./routes/payment.routes";
import chatRoutes from "./routes/chat.routes";
import adminRoutes from "./routes/admin.routes";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: false,
    })
  );
  app.use(
    cors({
      origin: env.WEB_URL,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));
  app.use(generalLimiter);

  app.get("/health", (_req, res) => res.json({ ok: true, ts: Date.now() }));

  const v1 = express.Router();
  v1.use("/auth", authRoutes);
  v1.use("/users", userRoutes);
  v1.use("/rides", rideRoutes);
  v1.use("/drivers", driverRoutes);
  v1.use("/payments", paymentRoutes);
  v1.use("/chat", chatRoutes);
  v1.use("/admin", adminRoutes);
  app.use("/api/v1", v1);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

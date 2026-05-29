import type { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env";
import { verifyAccessToken } from "../utils/jwt";
import type { AccessTokenPayload } from "../utils/jwt";
import { prisma } from "../prisma";
import { logger } from "../utils/logger";

type SocketData = { user: AccessTokenPayload };

/**
 * Real-time gateway for Velora.
 *
 * Channels (rooms):
 *   user:{userId}  — every user joins their personal room for notifications
 *   ride:{rideId}  — rider, driver, and admin observers get ride events
 *   drivers:nearby — driver location pings broadcast to nearby riders
 */
export function attachSocket(httpServer: HttpServer) {
  const io = new Server<any, any, any, SocketData>(httpServer, {
    cors: {
      origin: env.WEB_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token =
      (socket.handshake.auth?.token as string | undefined) ||
      (socket.handshake.headers.authorization?.toString().replace(/^Bearer /, ""));
    if (!token) return next(new Error("Unauthorized"));
    try {
      socket.data.user = verifyAccessToken(token);
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.data.user;
    socket.join(`user:${user.sub}`);
    logger.debug({ userId: user.sub }, "socket connected");

    socket.on("ride:join", (rideId: string) => {
      socket.join(`ride:${rideId}`);
    });
    socket.on("ride:leave", (rideId: string) => {
      socket.leave(`ride:${rideId}`);
    });

    // Driver location updates while online
    socket.on(
      "driver:location",
      async (payload: { lat: number; lng: number; rideId?: string }) => {
        if (user.role !== "DRIVER") return;
        try {
          await prisma.driverProfile.update({
            where: { userId: user.sub },
            data: {
              lastLat: payload.lat,
              lastLng: payload.lng,
              lastSeenAt: new Date(),
            },
          });
        } catch {
          /* ignore if profile missing */
        }
        if (payload.rideId) {
          io.to(`ride:${payload.rideId}`).emit("ride:driver-location", {
            rideId: payload.rideId,
            lat: payload.lat,
            lng: payload.lng,
            at: Date.now(),
          });
        }
      }
    );

    // Realtime negotiation: driver counter-offer
    socket.on(
      "ride:offer",
      (payload: {
        rideId: string;
        amount: number;
        etaSeconds: number;
      }) => {
        if (user.role !== "DRIVER") return;
        io.to(`ride:${payload.rideId}`).emit("ride:offer", {
          ...payload,
          driverId: user.sub,
          at: Date.now(),
        });
      }
    );

    // Realtime chat
    socket.on(
      "chat:send",
      (payload: { rideId: string; body: string }) => {
        io.to(`ride:${payload.rideId}`).emit("chat:message", {
          rideId: payload.rideId,
          senderId: user.sub,
          body: payload.body,
          at: Date.now(),
        });
      }
    );

    socket.on("disconnect", () => {
      logger.debug({ userId: user.sub }, "socket disconnected");
    });
  });

  return io;
}

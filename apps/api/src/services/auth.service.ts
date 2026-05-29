import { addDays, addMinutes } from "../utils/date";
import { prisma } from "../prisma";
import { badRequest, conflict, unauthorized } from "../utils/http";
import {
  generateOpaqueToken,
  hashPassword,
  hashToken,
  verifyPassword,
} from "../utils/password";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { emailService } from "./email.service";
import type { Role, User } from "@prisma/client";
import { nanoid } from "nanoid";

const REFRESH_TTL_DAYS = 30;

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export const authService = {
  async register(input: {
    email: string;
    password: string;
    name: string;
    role: "RIDER" | "DRIVER";
  }) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });
    if (existing) throw conflict("Email is already registered");

    const passwordHash = await hashPassword(input.password);
    const user = await prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        name: input.name,
        passwordHash,
        role: input.role as Role,
        ...(input.role === "DRIVER"
          ? { driver: { create: { status: "PENDING" } } }
          : {}),
      },
    });

    // Email verification token
    const { token, hash } = generateOpaqueToken();
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        tokenHash: hash,
        expiresAt: addDays(new Date(), 2),
      },
    });
    await emailService.verifyEmail(user.email, token);

    const tokens = await issueTokens(user);
    return { user: sanitize(user), ...tokens };
  },

  async login(input: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });
    if (!user || !user.passwordHash)
      throw unauthorized("Invalid credentials");
    if (user.status !== "ACTIVE")
      throw unauthorized("Account is not active");
    const ok = await verifyPassword(user.passwordHash, input.password);
    if (!ok) throw unauthorized("Invalid credentials");
    const tokens = await issueTokens(user);
    return { user: sanitize(user), ...tokens };
  },

  async refresh(refreshToken: string) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw unauthorized("Invalid refresh token");
    }
    const tokenHash = hashToken(refreshToken);
    const stored = await prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
    if (!stored || stored.revokedAt || stored.expiresAt < new Date())
      throw unauthorized("Refresh token revoked or expired");

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
    });
    if (!user || user.status !== "ACTIVE")
      throw unauthorized("Account unavailable");

    // Rotate refresh token
    await prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });
    const tokens = await issueTokens(user);
    return tokens;
  },

  async logout(refreshToken: string) {
    if (!refreshToken) return;
    const tokenHash = hashToken(refreshToken);
    await prisma.refreshToken
      .update({ where: { tokenHash }, data: { revokedAt: new Date() } })
      .catch(() => null);
  },

  async verifyEmail(token: string) {
    const tokenHash = hashToken(token);
    const record = await prisma.verificationToken.findUnique({
      where: { tokenHash },
    });
    if (!record || record.consumedAt || record.expiresAt < new Date())
      throw badRequest("Invalid or expired verification token");
    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { emailVerified: true },
      }),
      prisma.verificationToken.update({
        where: { id: record.id },
        data: { consumedAt: new Date() },
      }),
    ]);
  },

  async forgotPassword(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    // Do not reveal existence
    if (!user) return;
    const { token, hash } = generateOpaqueToken();
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash: hash,
        expiresAt: addMinutes(new Date(), 30),
      },
    });
    await emailService.resetPassword(user.email, token);
  },

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = hashToken(token);
    const record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });
    if (!record || record.consumedAt || record.expiresAt < new Date())
      throw badRequest("Invalid or expired reset token");
    const passwordHash = await hashPassword(newPassword);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { passwordHash },
      }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { consumedAt: new Date() },
      }),
      prisma.refreshToken.updateMany({
        where: { userId: record.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      }),
    ]);
  },

  sanitize,
};

function sanitize(user: User) {
  const { passwordHash, ...safe } = user;
  return safe;
}

async function issueTokens(user: User): Promise<AuthTokens & { user: ReturnType<typeof sanitize> }> {
  const accessToken = signAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email,
  });
  const jti = nanoid();
  const refreshToken = signRefreshToken({ sub: user.id, jti });
  const tokenHash = hashToken(refreshToken);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash,
      expiresAt: addDays(new Date(), REFRESH_TTL_DAYS),
    },
  });
  return { accessToken, refreshToken, user: sanitize(user) };
}

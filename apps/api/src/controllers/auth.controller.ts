import type { Request, Response } from "express";
import { z } from "zod";
import { authService } from "../services/auth.service";
import { isProd } from "../config/env";
import { unauthorized } from "../utils/http";

const REFRESH_COOKIE = "velora_refresh";

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/api/v1/auth",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}
function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE, { path: "/api/v1/auth" });
}

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["RIDER", "DRIVER"]).default("RIDER"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const verifyEmailSchema = z.object({ token: z.string().min(10) });
const forgotSchema = z.object({ email: z.string().email() });
const resetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8),
});

export const authController = {
  async register(req: Request, res: Response) {
    const body = registerSchema.parse(req.body);
    const result = await authService.register(body);
    setRefreshCookie(res, result.refreshToken);
    res
      .status(201)
      .json({ user: result.user, accessToken: result.accessToken });
  },

  async login(req: Request, res: Response) {
    const body = loginSchema.parse(req.body);
    const result = await authService.login(body);
    setRefreshCookie(res, result.refreshToken);
    res.json({ user: result.user, accessToken: result.accessToken });
  },

  async refresh(req: Request, res: Response) {
    const token = req.cookies?.[REFRESH_COOKIE];
    if (!token) throw unauthorized("Missing refresh cookie");
    const tokens = await authService.refresh(token);
    setRefreshCookie(res, tokens.refreshToken);
    res.json({ accessToken: tokens.accessToken });
  },

  async logout(req: Request, res: Response) {
    const token = req.cookies?.[REFRESH_COOKIE];
    await authService.logout(token);
    clearRefreshCookie(res);
    res.json({ ok: true });
  },

  async verifyEmail(req: Request, res: Response) {
    const { token } = verifyEmailSchema.parse(req.body);
    await authService.verifyEmail(token);
    res.json({ ok: true });
  },

  async forgotPassword(req: Request, res: Response) {
    const { email } = forgotSchema.parse(req.body);
    await authService.forgotPassword(email);
    res.json({ ok: true });
  },

  async resetPassword(req: Request, res: Response) {
    const { token, password } = resetSchema.parse(req.body);
    await authService.resetPassword(token, password);
    res.json({ ok: true });
  },

  async me(req: Request, res: Response) {
    res.json({ user: req.user });
  },
};

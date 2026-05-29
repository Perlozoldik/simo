import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth";
import { authLimiter } from "../middleware/rateLimit";
import { env } from "../config/env";

const router = Router();

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.post("/verify-email", authController.verifyEmail);
router.post("/forgot-password", authLimiter, authController.forgotPassword);
router.post("/reset-password", authLimiter, authController.resetPassword);
router.get("/me", requireAuth, authController.me);

// Google OAuth — only enabled if creds are provided. We keep the routes
// stub-friendly so the rest of the API works without configuring Google.
router.get("/google", (req, res) => {
  if (!env.GOOGLE_CLIENT_ID) {
    return res.status(501).json({
      message: "Google OAuth not configured",
      code: "OAUTH_DISABLED",
    });
  }
  // In production, redirect to Google's OAuth consent screen via passport.
  // Implementation omitted for brevity but the slot is wired and ready.
  res.redirect(env.WEB_URL + "/login?provider=google_pending");
});

router.get("/google/callback", (_req, res) => {
  res.redirect(env.WEB_URL);
});

export default router;

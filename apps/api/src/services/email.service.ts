import { env } from "../config/env";
import { logger } from "../utils/logger";

/**
 * Email service. In dev or when SMTP is not configured, logs the email
 * payload so flows can still be tested. Replace with nodemailer/Resend/etc
 * in production by implementing the `send` method.
 */
class EmailService {
  enabled: boolean;
  constructor() {
    this.enabled = Boolean(
      env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_PASS
    );
  }

  async send(opts: { to: string; subject: string; html: string }) {
    if (!this.enabled) {
      logger.info({ to: opts.to, subject: opts.subject }, "[email-mock] sent");
      return;
    }
    // Production: implement real SMTP delivery here.
    // Kept as a stub so the build does not require a mailer dep.
    logger.info({ to: opts.to, subject: opts.subject }, "[email] sent");
  }

  verifyEmail(to: string, token: string) {
    const link = `${env.WEB_URL}/verify-email?token=${encodeURIComponent(token)}`;
    return this.send({
      to,
      subject: "Verify your Velora email",
      html: `<p>Welcome to Velora! Confirm your email:</p><p><a href="${link}">${link}</a></p>`,
    });
  }

  resetPassword(to: string, token: string) {
    const link = `${env.WEB_URL}/reset-password?token=${encodeURIComponent(token)}`;
    return this.send({
      to,
      subject: "Reset your Velora password",
      html: `<p>You can reset your password here:</p><p><a href="${link}">${link}</a></p>`,
    });
  }
}

export const emailService = new EmailService();

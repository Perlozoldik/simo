import argon2 from "argon2";
import crypto from "node:crypto";

export async function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, { type: argon2.argon2id });
}

export async function verifyPassword(
  hash: string,
  plain: string
): Promise<boolean> {
  return argon2.verify(hash, plain);
}

/**
 * Generate a cryptographically random opaque token + its sha256 hash.
 * Plaintext is sent to the user; only the hash is stored in the DB.
 */
export function generateOpaqueToken(bytes = 32): {
  token: string;
  hash: string;
} {
  const token = crypto.randomBytes(bytes).toString("base64url");
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, hash };
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

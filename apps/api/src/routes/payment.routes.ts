import { Router } from "express";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { notFound } from "../utils/http";

const router = Router();
router.use(requireAuth);

router.get("/methods", async (req, res) => {
  const methods = await prisma.paymentMethodRecord.findMany({
    where: { userId: req.user!.sub },
    orderBy: { createdAt: "desc" },
  });
  res.json({ methods });
});

const methodSchema = z.object({
  method: z.enum(["CARD", "PAYPAL", "CRYPTO"]),
  brand: z.string().optional(),
  last4: z.string().optional(),
  externalId: z.string().optional(),
  isDefault: z.boolean().optional(),
});

router.post(
  "/methods",
  validate(methodSchema),
  async (req, res) => {
    const created = await prisma.paymentMethodRecord.create({
      data: { ...req.body, userId: req.user!.sub },
    });
    res.status(201).json({ method: created });
  }
);

const chargeSchema = z.object({
  rideId: z.string(),
  amount: z.number().positive(),
  method: z.enum(["CASH", "CARD", "PAYPAL", "CRYPTO"]),
});

/**
 * Charge endpoint. In production this delegates to the appropriate gateway
 * (Stripe / PayPal / on-chain). Here we record the payment and mark cash as
 * captured, leaving other methods in PENDING.
 */
router.post("/charge", validate(chargeSchema), async (req, res) => {
  const ride = await prisma.ride.findUnique({ where: { id: req.body.rideId } });
  if (!ride) throw notFound("Ride not found");
  const payment = await prisma.payment.upsert({
    where: { rideId: ride.id },
    create: {
      rideId: ride.id,
      amount: new Prisma.Decimal(req.body.amount),
      method: req.body.method,
      status: req.body.method === "CASH" ? "CAPTURED" : "PENDING",
      paidAt: req.body.method === "CASH" ? new Date() : null,
    },
    update: {
      amount: new Prisma.Decimal(req.body.amount),
      method: req.body.method,
    },
  });
  res.json({ payment });
});

export default router;

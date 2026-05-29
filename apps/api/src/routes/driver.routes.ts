import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { requireAuth, requireRole } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { notFound } from "../utils/http";

const router = Router();
router.use(requireAuth);

router.get("/me", requireRole("DRIVER"), async (req, res) => {
  const driver = await prisma.driverProfile.findUnique({
    where: { userId: req.user!.sub },
    include: { vehicles: true, documents: true },
  });
  if (!driver) throw notFound("Driver profile not found");
  res.json({ driver });
});

const onlineSchema = z.object({ online: z.boolean() });
router.post(
  "/online",
  requireRole("DRIVER"),
  validate(onlineSchema),
  async (req, res) => {
    const driver = await prisma.driverProfile.update({
      where: { userId: req.user!.sub },
      data: {
        isOnline: req.body.online,
        lastSeenAt: new Date(),
      },
    });
    res.json({ driver });
  }
);

const vehicleSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().int().min(1990).max(new Date().getFullYear() + 1),
  color: z.string().min(1),
  plate: z.string().min(1),
  capacity: z.number().int().min(1).max(8).default(4),
});

router.post(
  "/vehicles",
  requireRole("DRIVER"),
  validate(vehicleSchema),
  async (req, res) => {
    const driver = await prisma.driverProfile.findUnique({
      where: { userId: req.user!.sub },
    });
    if (!driver) throw notFound("Driver profile not found");
    const vehicle = await prisma.vehicle.create({
      data: { ...req.body, driverId: driver.id },
    });
    res.status(201).json({ vehicle });
  }
);

const documentSchema = z.object({
  type: z.enum([
    "DRIVER_LICENSE",
    "ID_CARD",
    "VEHICLE_REGISTRATION",
    "INSURANCE",
    "PROFILE_PHOTO",
  ]),
  fileUrl: z.string().url(),
});

router.post(
  "/documents",
  requireRole("DRIVER"),
  validate(documentSchema),
  async (req, res) => {
    const driver = await prisma.driverProfile.findUnique({
      where: { userId: req.user!.sub },
    });
    if (!driver) throw notFound("Driver profile not found");
    const document = await prisma.driverDocument.create({
      data: { ...req.body, driverId: driver.id },
    });
    res.status(201).json({ document });
  }
);

const payoutSchema = z.object({
  amount: z.number().positive(),
  method: z.string().min(1),
});

router.post(
  "/payouts",
  requireRole("DRIVER"),
  validate(payoutSchema),
  async (req, res) => {
    const driver = await prisma.driverProfile.findUnique({
      where: { userId: req.user!.sub },
    });
    if (!driver) throw notFound("Driver profile not found");
    const payout = await prisma.payout.create({
      data: { ...req.body, driverId: driver.id },
    });
    res.status(201).json({ payout });
  }
);

export default router;

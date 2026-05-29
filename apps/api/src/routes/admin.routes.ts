import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { requireAuth, requireRole } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();
router.use(requireAuth, requireRole("ADMIN"));

router.get("/overview", async (_req, res) => {
  const [
    activeRiders,
    onlineDrivers,
    liveRides,
    todayRevenue,
    fraudAlerts,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "RIDER", status: "ACTIVE" } }),
    prisma.driverProfile.count({ where: { isOnline: true } }),
    prisma.ride.count({
      where: { status: { in: ["ACCEPTED", "ARRIVING", "IN_PROGRESS"] } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: "CAPTURED",
        paidAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
    prisma.fraudAlert.count({
      where: { resolvedAt: null, severity: { in: ["HIGH", "MEDIUM"] } },
    }),
  ]);
  res.json({
    activeRiders,
    onlineDrivers,
    liveRides,
    todayRevenue: todayRevenue._sum.amount ?? 0,
    fraudAlerts,
  });
});

router.get("/users", async (req, res) => {
  const search = String(req.query.search ?? "");
  const users = await prisma.user.findMany({
    where: search
      ? {
          OR: [
            { email: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
  res.json({ users });
});

const statusSchema = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED", "BANNED"]),
});

router.post(
  "/users/:id/status",
  validate(statusSchema),
  async (req, res) => {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    });
    res.json({ user });
  }
);

router.get("/rides/live", async (_req, res) => {
  const rides = await prisma.ride.findMany({
    where: { status: { in: ["ACCEPTED", "ARRIVING", "IN_PROGRESS"] } },
    include: {
      rider: { select: { id: true, name: true } },
      driver: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  res.json({ rides });
});

router.get("/settings", async (_req, res) => {
  const settings = await prisma.platformSetting.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });
  res.json({ settings });
});

const settingsSchema = z.object({
  commissionPercent: z.number().min(0).max(50).optional(),
  minSurge: z.number().min(1).optional(),
  maxSurge: z.number().min(1).optional(),
  baseFare: z.number().min(0).optional(),
  perKm: z.number().min(0).optional(),
  perMinute: z.number().min(0).optional(),
});

router.patch(
  "/settings",
  validate(settingsSchema),
  async (req, res) => {
    const settings = await prisma.platformSetting.update({
      where: { id: "singleton" },
      data: req.body,
    });
    res.json({ settings });
  }
);

router.get("/fraud-alerts", async (_req, res) => {
  const alerts = await prisma.fraudAlert.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  res.json({ alerts });
});

export default router;

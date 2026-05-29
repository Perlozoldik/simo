import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();
router.use(requireAuth);

router.get("/me", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.sub },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      avatarUrl: true,
      role: true,
      emailVerified: true,
      locale: true,
      status: true,
      createdAt: true,
    },
  });
  res.json({ user });
});

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  locale: z.string().optional(),
});

router.patch("/me", validate(updateSchema), async (req, res) => {
  const user = await prisma.user.update({
    where: { id: req.user!.sub },
    data: req.body,
  });
  res.json({ user });
});

const placeSchema = z.object({
  label: z.string().min(1),
  address: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
});

router.get("/me/places", async (req, res) => {
  const places = await prisma.savedPlace.findMany({
    where: { userId: req.user!.sub },
    orderBy: { createdAt: "desc" },
  });
  res.json({ places });
});

router.post("/me/places", validate(placeSchema), async (req, res) => {
  const place = await prisma.savedPlace.create({
    data: { ...req.body, userId: req.user!.sub },
  });
  res.status(201).json({ place });
});

router.delete("/me/places/:id", async (req, res) => {
  await prisma.savedPlace.deleteMany({
    where: { id: req.params.id, userId: req.user!.sub },
  });
  res.json({ ok: true });
});

router.post("/me/sos", async (req, res) => {
  const evt = await prisma.sosEvent.create({
    data: {
      userId: req.user!.sub,
      lat: req.body?.lat,
      lng: req.body?.lng,
      rideId: req.body?.rideId,
    },
  });
  res.status(201).json({ event: evt });
});

export default router;

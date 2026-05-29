import { Router } from "express";
import { z } from "zod";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { forbidden, notFound } from "../utils/http";

const router = Router();
router.use(requireAuth);

router.get("/:rideId", async (req, res) => {
  const ride = await prisma.ride.findUnique({
    where: { id: req.params.rideId },
  });
  if (!ride) throw notFound();
  if (
    req.user!.role !== "ADMIN" &&
    ride.riderId !== req.user!.sub &&
    ride.driverId !== req.user!.sub
  )
    throw forbidden();
  const messages = await prisma.chatMessage.findMany({
    where: { rideId: ride.id },
    orderBy: { createdAt: "asc" },
    take: 200,
  });
  res.json({ messages });
});

const messageSchema = z.object({ body: z.string().min(1).max(2000) });

router.post(
  "/:rideId",
  validate(messageSchema),
  async (req, res) => {
    const ride = await prisma.ride.findUnique({
      where: { id: req.params.rideId },
    });
    if (!ride) throw notFound();
    if (ride.riderId !== req.user!.sub && ride.driverId !== req.user!.sub)
      throw forbidden();
    const msg = await prisma.chatMessage.create({
      data: {
        rideId: ride.id,
        senderId: req.user!.sub,
        body: req.body.body,
      },
    });
    res.status(201).json({ message: msg });
  }
);

export default router;

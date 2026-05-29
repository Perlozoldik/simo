import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireRole } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { rideService } from "../services/ride.service";
import { pricingService } from "../services/pricing.service";

const router = Router();
router.use(requireAuth);

const placeSchema = z.object({
  label: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
});

const estimateSchema = z.object({
  pickup: z.object({ lat: z.number(), lng: z.number() }),
  dropoff: z.object({ lat: z.number(), lng: z.number() }),
  surge: z.number().optional(),
});

router.post("/estimate", validate(estimateSchema), async (req, res) => {
  const fare = await pricingService.estimate(req.body);
  res.json(fare);
});

const createRideSchema = z.object({
  pickup: placeSchema,
  dropoff: placeSchema,
  proposedFare: z.number().positive(),
  paymentMethod: z.enum(["CASH", "CARD", "PAYPAL", "CRYPTO"]).optional(),
  promoCode: z.string().optional(),
});

router.post(
  "/",
  requireRole("RIDER"),
  validate(createRideSchema),
  async (req, res) => {
    const ride = await rideService.create({
      riderId: req.user!.sub,
      ...req.body,
    });
    res.status(201).json({ ride });
  }
);

router.get("/", async (req, res) => {
  const rides = await rideService.listForUser(req.user!.sub, req.user!.role);
  res.json({ rides });
});

router.get("/:id", async (req, res) => {
  const ride = await rideService.getById(
    req.params.id,
    req.user!.sub,
    req.user!.role
  );
  res.json({ ride });
});

const offerSchema = z.object({
  amount: z.number().positive(),
  etaSeconds: z.number().int().positive(),
});

router.post(
  "/:id/offers",
  requireRole("DRIVER"),
  validate(offerSchema),
  async (req, res) => {
    const offer = await rideService.submitOffer({
      rideId: req.params.id,
      driverId: req.user!.sub,
      ...req.body,
    });
    res.status(201).json({ offer });
  }
);

router.post(
  "/offers/:offerId/accept",
  requireRole("RIDER"),
  async (req, res) => {
    const result = await rideService.acceptOffer({
      offerId: req.params.offerId,
      riderId: req.user!.sub,
    });
    res.json(result);
  }
);

const statusSchema = z.object({
  status: z.enum(["ARRIVING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]),
  reason: z.string().optional(),
});

router.post(
  "/:id/status",
  validate(statusSchema),
  async (req, res) => {
    const ride = await rideService.updateStatus({
      rideId: req.params.id,
      actorId: req.user!.sub,
      role: req.user!.role,
      ...req.body,
    });
    res.json({ ride });
  }
);

export default router;

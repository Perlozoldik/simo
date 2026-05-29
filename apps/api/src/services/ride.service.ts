import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { pricingService } from "./pricing.service";
import { badRequest, forbidden, notFound } from "../utils/http";
import { addMinutes } from "../utils/date";

export type CreateRideInput = {
  riderId: string;
  pickup: { label: string; lat: number; lng: number };
  dropoff: { label: string; lat: number; lng: number };
  proposedFare: number;
  paymentMethod?: "CASH" | "CARD" | "PAYPAL" | "CRYPTO";
  promoCode?: string;
};

export const rideService = {
  async create(input: CreateRideInput) {
    if (input.proposedFare <= 0) throw badRequest("Fare must be greater than 0");
    const distanceKm = pricingService.haversineKm(input.pickup, input.dropoff);
    const ride = await prisma.ride.create({
      data: {
        riderId: input.riderId,
        status: "SEARCHING",
        pickupLabel: input.pickup.label,
        pickupLat: input.pickup.lat,
        pickupLng: input.pickup.lng,
        dropoffLabel: input.dropoff.label,
        dropoffLat: input.dropoff.lat,
        dropoffLng: input.dropoff.lng,
        distanceKm,
        proposedFare: new Prisma.Decimal(input.proposedFare),
        paymentMethod: input.paymentMethod ?? "CASH",
        promoCode: input.promoCode,
        events: { create: { type: "CREATED" } },
      },
    });
    return ride;
  },

  async listForUser(userId: string, role: "RIDER" | "DRIVER" | "ADMIN") {
    const where =
      role === "RIDER"
        ? { riderId: userId }
        : role === "DRIVER"
          ? { driverId: userId }
          : {};
    return prisma.ride.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  },

  async getById(rideId: string, userId: string, role: string) {
    const ride = await prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw notFound("Ride not found");
    if (
      role !== "ADMIN" &&
      ride.riderId !== userId &&
      ride.driverId !== userId
    )
      throw forbidden();
    return ride;
  },

  async submitOffer(input: {
    rideId: string;
    driverId: string;
    amount: number;
    etaSeconds: number;
  }) {
    const ride = await prisma.ride.findUnique({
      where: { id: input.rideId },
    });
    if (!ride) throw notFound("Ride not found");
    if (ride.status !== "SEARCHING" && ride.status !== "NEGOTIATING")
      throw badRequest("Ride is not accepting offers");
    const offer = await prisma.rideOffer.create({
      data: {
        rideId: input.rideId,
        driverId: input.driverId,
        amount: new Prisma.Decimal(input.amount),
        etaSeconds: input.etaSeconds,
        expiresAt: addMinutes(new Date(), 2),
      },
    });
    if (ride.status === "SEARCHING") {
      await prisma.ride.update({
        where: { id: ride.id },
        data: { status: "NEGOTIATING" },
      });
    }
    return offer;
  },

  async acceptOffer(input: {
    offerId: string;
    riderId: string;
  }) {
    const offer = await prisma.rideOffer.findUnique({
      where: { id: input.offerId },
      include: { ride: true },
    });
    if (!offer) throw notFound("Offer not found");
    if (offer.ride.riderId !== input.riderId) throw forbidden();
    if (offer.status !== "PENDING" || offer.expiresAt < new Date())
      throw badRequest("Offer is no longer valid");

    return prisma.$transaction(async (tx) => {
      const accepted = await tx.rideOffer.update({
        where: { id: offer.id },
        data: { status: "ACCEPTED" },
      });
      await tx.rideOffer.updateMany({
        where: {
          rideId: offer.rideId,
          id: { not: offer.id },
          status: "PENDING",
        },
        data: { status: "REJECTED" },
      });
      const ride = await tx.ride.update({
        where: { id: offer.rideId },
        data: {
          status: "ACCEPTED",
          driverId: offer.driverId,
          finalFare: offer.amount,
          events: {
            create: { type: "ACCEPTED", payload: { offerId: offer.id } },
          },
        },
      });
      return { ride, offer: accepted };
    });
  },

  async updateStatus(input: {
    rideId: string;
    actorId: string;
    role: string;
    status: "ARRIVING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    reason?: string;
  }) {
    const ride = await prisma.ride.findUnique({ where: { id: input.rideId } });
    if (!ride) throw notFound("Ride not found");

    if (input.role !== "ADMIN") {
      const involved =
        ride.riderId === input.actorId || ride.driverId === input.actorId;
      if (!involved) throw forbidden();
    }

    return prisma.ride.update({
      where: { id: ride.id },
      data: {
        status: input.status,
        cancelReason: input.status === "CANCELLED" ? input.reason : undefined,
        startedAt:
          input.status === "IN_PROGRESS" ? new Date() : ride.startedAt,
        completedAt:
          input.status === "COMPLETED" ? new Date() : ride.completedAt,
        cancelledAt:
          input.status === "CANCELLED" ? new Date() : ride.cancelledAt,
        events: { create: { type: input.status } },
      },
    });
  },
};

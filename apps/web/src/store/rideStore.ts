"use client";

import { create } from "zustand";
import type { Place, Ride, RideOffer, PaymentMethod } from "@/types";

type RideState = {
  pickup?: Place;
  dropoff?: Place;
  proposedFare: number;
  paymentMethod: PaymentMethod;
  offers: RideOffer[];
  active?: Ride;
  setPickup: (p?: Place) => void;
  setDropoff: (p?: Place) => void;
  setProposedFare: (n: number) => void;
  setPaymentMethod: (m: PaymentMethod) => void;
  setOffers: (o: RideOffer[]) => void;
  setActive: (r?: Ride) => void;
  reset: () => void;
};

export const useRideStore = create<RideState>((set) => ({
  pickup: undefined,
  dropoff: undefined,
  proposedFare: 0,
  paymentMethod: "CASH",
  offers: [],
  active: undefined,
  setPickup: (pickup) => set({ pickup }),
  setDropoff: (dropoff) => set({ dropoff }),
  setProposedFare: (proposedFare) => set({ proposedFare }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setOffers: (offers) => set({ offers }),
  setActive: (active) => set({ active }),
  reset: () =>
    set({
      pickup: undefined,
      dropoff: undefined,
      proposedFare: 0,
      offers: [],
      active: undefined,
    }),
}));

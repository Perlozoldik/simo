import { prisma } from "../prisma";

export type FareEstimate = {
  baseFare: number;
  distanceFare: number;
  timeFare: number;
  surgeMultiplier: number;
  total: number;
  currency: string;
};

const haversineKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const toRad = (n: number) => (n * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(x));
};

async function getSettings() {
  const s = await prisma.platformSetting.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });
  return s;
}

export const pricingService = {
  async estimate(input: {
    pickup: { lat: number; lng: number };
    dropoff: { lat: number; lng: number };
    surge?: number;
  }): Promise<FareEstimate> {
    const s = await getSettings();
    const km = haversineKm(input.pickup, input.dropoff);
    const minutes = Math.max(5, km * 2.2); // crude city-time approximation
    const baseFare = Number(s.baseFare);
    const distanceFare = km * Number(s.perKm);
    const timeFare = minutes * Number(s.perMinute);
    const surge = clamp(input.surge ?? 1, s.minSurge, s.maxSurge);
    const total = (baseFare + distanceFare + timeFare) * surge;
    return {
      baseFare,
      distanceFare,
      timeFare,
      surgeMultiplier: surge,
      total: round2(total),
      currency: "USD",
    };
  },

  haversineKm,
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export type Role = "RIDER" | "DRIVER" | "ADMIN";

export type LatLng = { lat: number; lng: number };

export type Place = {
  id: string;
  label: string;
  address: string;
  location: LatLng;
};

export type RideStatus =
  | "DRAFT"
  | "SEARCHING"
  | "NEGOTIATING"
  | "ACCEPTED"
  | "ARRIVING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentMethod = "CASH" | "CARD" | "PAYPAL" | "CRYPTO";

export type RideOffer = {
  id: string;
  driverId: string;
  driverName: string;
  driverRating: number;
  vehicle: string;
  etaSeconds: number;
  amount: number;
};

export type Ride = {
  id: string;
  status: RideStatus;
  pickup: Place;
  dropoff: Place;
  proposedFare: number;
  finalFare?: number;
  paymentMethod: PaymentMethod;
  driverId?: string;
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  emailVerified: boolean;
  phone?: string;
};

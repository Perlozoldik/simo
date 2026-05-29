"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Banknote,
  Bitcoin,
  CreditCard,
  Handshake,
  MapPin,
  Navigation2,
  Search,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { cn, formatCurrency } from "@/lib/utils";
import type { PaymentMethod, RideOffer } from "@/types";

const paymentOptions: {
  id: PaymentMethod;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "CASH", label: "Cash", icon: Banknote },
  { id: "CARD", label: "Card", icon: CreditCard },
  { id: "PAYPAL", label: "PayPal", icon: CreditCard },
  { id: "CRYPTO", label: "Crypto", icon: Bitcoin },
];

const mockOffers: RideOffer[] = [
  {
    id: "1",
    driverId: "d_1",
    driverName: "Aisha K.",
    driverRating: 4.97,
    vehicle: "Tesla Model 3 · White",
    etaSeconds: 180,
    amount: 26,
  },
  {
    id: "2",
    driverId: "d_2",
    driverName: "Marco R.",
    driverRating: 4.92,
    vehicle: "Toyota Camry · Black",
    etaSeconds: 300,
    amount: 24.5,
  },
  {
    id: "3",
    driverId: "d_3",
    driverName: "Devon L.",
    driverRating: 4.88,
    vehicle: "Hyundai Sonata · Silver",
    etaSeconds: 480,
    amount: 22,
  },
];

type Step = "form" | "negotiating" | "matched";

export function BookingPanel() {
  const [step, setStep] = useState<Step>("form");
  const [pickup, setPickup] = useState("Marina Bay, Singapore");
  const [dropoff, setDropoff] = useState("Changi Airport, T3");
  const [fare, setFare] = useState(24.5);
  const [payment, setPayment] = useState<PaymentMethod>("CASH");
  const [matched, setMatched] = useState<RideOffer | null>(null);

  const suggested = useMemo(
    () => ({ low: 18, mid: 24.5, high: 32 }),
    []
  );

  const onSearch = () => setStep("negotiating");
  const onAccept = (offer: RideOffer) => {
    setMatched(offer);
    setStep("matched");
  };
  const onCancel = () => {
    setStep("form");
    setMatched(null);
  };

  return (
    <div className="card p-5 flex flex-col h-full min-h-[640px]">
      {step === "form" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-5 h-full"
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Where to?</h2>
            <p className="text-sm text-white/55">
              Set your trip and propose a fare. Drivers will counter in real
              time.
            </p>
          </div>

          <div className="space-y-2">
            <FieldRow
              icon={<MapPin className="h-4 w-4 text-brand-300" />}
              label="Pickup"
              value={pickup}
              onChange={setPickup}
            />
            <FieldRow
              icon={<Navigation2 className="h-4 w-4 text-cyan-300" />}
              label="Dropoff"
              value={dropoff}
              onChange={setDropoff}
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-white/55">
              <span className="uppercase tracking-wider">Your offer</span>
              <span>Suggested {formatCurrency(suggested.mid)}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-semibold tracking-tight">
                {formatCurrency(fare)}
              </span>
              <input
                type="range"
                min={Math.round(suggested.low * 0.7)}
                max={Math.round(suggested.high * 1.3)}
                step={0.5}
                value={fare}
                onChange={(e) => setFare(parseFloat(e.target.value))}
                className="flex-1 accent-brand-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                className="chip"
                onClick={() => setFare(suggested.low)}
              >
                {formatCurrency(suggested.low)} fast
              </button>
              <button
                className="chip"
                onClick={() => setFare(suggested.mid)}
              >
                {formatCurrency(suggested.mid)} fair
              </button>
              <button
                className="chip"
                onClick={() => setFare(suggested.high)}
              >
                {formatCurrency(suggested.high)} priority
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-wider text-white/55">
              Payment method
            </div>
            <div className="grid grid-cols-4 gap-2">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPayment(opt.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs transition",
                    payment === opt.id
                      ? "border-brand-500/60 bg-brand-500/10 text-brand-200"
                      : "border-white/[0.08] bg-white/[0.02] text-white/65 hover:bg-white/[0.05]"
                  )}
                >
                  <opt.icon className="h-4 w-4" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <Button
              onClick={onSearch}
              size="lg"
              className="w-full"
              leftIcon={<Search className="h-4 w-4" />}
            >
              Find drivers
            </Button>
            <button className="w-full flex items-center justify-center gap-2 text-xs text-white/55 hover:text-white">
              <ShieldAlert className="h-3.5 w-3.5" />
              Share trip with trusted contact
            </button>
          </div>
        </motion.div>
      )}

      {step === "negotiating" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4 h-full"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Negotiating
              </h2>
              <p className="text-sm text-white/55">
                Drivers are sending counter-offers in real time.
              </p>
            </div>
            <Badge tone="success">
              <Handshake className="h-3.5 w-3.5" />
              {mockOffers.length} drivers
            </Badge>
          </div>

          <div className="space-y-2 flex-1 overflow-auto">
            <AnimatePresence>
              {mockOffers.map((offer, i) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={offer.driverName} />
                    <div>
                      <div className="text-sm font-medium">
                        {offer.driverName}
                      </div>
                      <div className="text-xs text-white/55">
                        ★ {offer.driverRating} · {offer.vehicle}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-semibold">
                      {formatCurrency(offer.amount)}
                    </div>
                    <div className="text-xs text-white/50">
                      {Math.round(offer.etaSeconds / 60)} min away
                    </div>
                    <Button
                      size="sm"
                      className="mt-1.5"
                      onClick={() => onAccept(offer)}
                    >
                      Accept
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Button variant="ghost" onClick={onCancel}>
            Cancel search
          </Button>
        </motion.div>
      )}

      {step === "matched" && matched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-4 h-full"
        >
          <Badge tone="success">Driver on the way</Badge>
          <div className="flex items-center gap-3">
            <Avatar name={matched.driverName} size={48} />
            <div>
              <div className="font-semibold">{matched.driverName}</div>
              <div className="text-xs text-white/55">
                ★ {matched.driverRating} · {matched.vehicle}
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-xs text-white/55">Fare</div>
              <div className="font-semibold">
                {formatCurrency(matched.amount)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs">
            <Cell label="ETA" value={`${Math.round(matched.etaSeconds / 60)}m`} />
            <Cell label="Distance" value="6.2 km" />
            <Cell label="Payment" value={payment} />
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2">
            <Button variant="ghost">Message</Button>
            <Button variant="danger" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function FieldRow({
  icon,
  label,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 py-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
        {icon}
      </span>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-wider text-white/45">
          {label}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center">
      <div className="text-[10px] uppercase tracking-wider text-white/50">
        {label}
      </div>
      <div className="mt-1 font-semibold capitalize">{value}</div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles, MapPin, Navigation2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1200px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[160px]" />
        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[120px]" />
      </div>
      <div className="container pt-20 pb-28 lg:pt-28 lg:pb-36 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="chip"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            Now negotiating fares in 32 cities
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            Set your price.
            <br />
            <span className="gradient-text">Move on your terms.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-lg text-white/70 max-w-xl"
          >
            Velora is the next-generation ride-hailing platform where riders
            propose fares, drivers respond in real time, and every trip is
            tracked, chatted, and paid the way you want.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link href="/register?role=rider">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Book your first ride
              </Button>
            </Link>
            <Link href="/register?role=driver">
              <Button size="lg" variant="ghost">
                Drive with Velora
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-6 pt-4 text-sm text-white/60"
          >
            <Stat value="2.4M+" label="Riders" />
            <Stat value="180k" label="Verified drivers" />
            <Stat value="4.9★" label="Avg. trip rating" />
            <Stat value="32" label="Cities live" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-5"
        >
          <FareCard />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      <div className="text-xs uppercase tracking-wider text-white/50">
        {label}
      </div>
    </div>
  );
}

function FareCard() {
  return (
    <div className="card p-6 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/60">Live offer</div>
        <div className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
          Searching nearby
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Row icon={<MapPin className="h-4 w-4 text-brand-400" />} label="Pickup" value="Marina Bay, Singapore" />
        <div className="ml-2 h-6 w-px bg-white/10" />
        <Row icon={<Navigation2 className="h-4 w-4 text-cyan-400" />} label="Dropoff" value="Changi Airport, T3" />
      </div>

      <div className="mt-6 rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/50">
              Your offer
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              $24.50
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-white/50">
              ETA
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              4 min
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <DriverOffer name="Aisha K." rating={4.97} eta={3} amount={26} />
        <DriverOffer name="Marco R." rating={4.92} eta={5} amount={24.5} highlighted />
        <DriverOffer name="Devon L." rating={4.88} eta={8} amount={22} />
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.05] border border-white/[0.06]">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-white/50">
          {label}
        </div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}

function DriverOffer({
  name,
  rating,
  eta,
  amount,
  highlighted,
}: {
  name: string;
  rating: number;
  eta: number;
  amount: number;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition ${
        highlighted
          ? "bg-brand-500/10 border-brand-500/40"
          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500/30 to-violet-500/30 text-xs font-semibold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-white/50">
            ★ {rating} · {eta} min away
          </div>
        </div>
      </div>
      <div className="text-sm font-semibold">${amount.toFixed(2)}</div>
    </div>
  );
}

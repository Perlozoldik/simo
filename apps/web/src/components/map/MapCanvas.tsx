"use client";

import { motion } from "framer-motion";
import { Navigation2 } from "lucide-react";

/**
 * Stylized map placeholder. In production, swap this for Mapbox GL or Google Maps.
 * The visual is designed to convey live-tracking without requiring a live key.
 */
export function MapCanvas({
  className,
  driverLabel = "Driver · 4 min",
}: {
  className?: string;
  driverLabel?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[radial-gradient(circle_at_50%_50%,#0e1320_0%,#06080d_70%)] ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06d77b" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Roads */}
        <path
          d="M0,360 C200,340 280,260 420,250 S680,230 800,180"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d="M0,360 C200,340 280,260 420,250 S680,230 800,180"
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1"
        />
        <path
          d="M120,500 C160,420 220,360 320,310 S540,260 620,160 720,40 800,20"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Active route */}
        <motion.path
          d="M120,420 C220,380 300,320 420,300 S620,260 700,140"
          fill="none"
          stroke="url(#route)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="0 1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>

      {/* Pickup marker */}
      <Marker
        x="14%"
        y="80%"
        color="#06d77b"
        label="Pickup"
      />
      {/* Dropoff marker */}
      <Marker x="84%" y="26%" color="#22d3ee" label="Dropoff" />

      {/* Driver marker */}
      <div
        className="absolute"
        style={{ left: "44%", top: "58%", transform: "translate(-50%,-50%)" }}
      >
        <div className="ring-pulse">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-500 text-black shadow-[0_10px_30px_-5px_rgba(6,215,123,0.6)]">
            <Navigation2 className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-2 -translate-x-1/2 absolute left-1/2 whitespace-nowrap rounded-full bg-black/80 px-2.5 py-1 text-[11px] font-medium border border-white/10">
          {driverLabel}
        </div>
      </div>
    </div>
  );
}

function Marker({
  x,
  y,
  color,
  label,
}: {
  x: string;
  y: string;
  color: string;
  label: string;
}) {
  return (
    <div
      className="absolute"
      style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}
    >
      <div
        className="h-3.5 w-3.5 rounded-full ring-4 ring-black"
        style={{ background: color, boxShadow: `0 0 0 4px ${color}33` }}
      />
      <div className="mt-2 -translate-x-1/2 absolute left-1/2 whitespace-nowrap rounded-full bg-black/80 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/70 border border-white/10">
        {label}
      </div>
    </div>
  );
}

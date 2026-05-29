"use client";

import { motion } from "framer-motion";
import {
  Handshake,
  ShieldCheck,
  Map,
  CreditCard,
  MessageCircle,
  Zap,
  Languages,
  Bell,
} from "lucide-react";

const features = [
  {
    icon: Handshake,
    title: "Negotiate the fare",
    body: "Propose a price, see real driver counter-offers, pick the best balance of speed and cost.",
  },
  {
    icon: Map,
    title: "Live driver tracking",
    body: "Real-time GPS, route preview, and ETA updates pushed instantly over websockets.",
  },
  {
    icon: ShieldCheck,
    title: "Safety first",
    body: "SOS button, verified drivers, ride sharing with trusted contacts, and AI fraud detection.",
  },
  {
    icon: CreditCard,
    title: "Pay your way",
    body: "Cash, Stripe, PayPal, or crypto — every market, every preference.",
  },
  {
    icon: MessageCircle,
    title: "In-app chat",
    body: "Coordinate pickup and luggage privately without sharing your phone number.",
  },
  {
    icon: Zap,
    title: "Smart pricing",
    body: "Surge transparency, promo codes, and a fair referral program for everyone.",
  },
  {
    icon: Bell,
    title: "Real-time notifications",
    body: "Push, in-app, and email — never miss a driver match or arrival.",
  },
  {
    icon: Languages,
    title: "Multi-language",
    body: "Localized for the regions we operate in, with right-to-left support.",
  },
];

export function Features() {
  return (
    <section id="riders" className="relative py-24">
      <div className="container">
        <div className="max-w-2xl">
          <span className="chip">Why Velora</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            A modern way to move,{" "}
            <span className="gradient-text">built for both sides</span>.
          </h2>
          <p className="mt-4 text-white/65 text-lg">
            Designed from the ground up for transparency, fairness, and speed —
            with the polish of a billion-dollar product.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.04 }}
              className="card p-5 group hover:border-brand-500/30 transition"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500/20 to-cyan-500/10 border border-brand-500/20 text-brand-300 group-hover:scale-110 transition">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-white/60">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

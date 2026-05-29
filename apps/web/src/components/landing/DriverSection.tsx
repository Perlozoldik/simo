"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wallet,
  ToggleRight,
  BadgeCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DriverSection() {
  return (
    <section id="drivers" className="py-24 relative">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50">
                  Today's earnings
                </div>
                <div className="mt-1 text-4xl font-semibold tracking-tight">
                  $284.40
                </div>
              </div>
              <div className="chip text-brand-300 border-brand-500/30 bg-brand-500/10">
                <ToggleRight className="h-4 w-4" />
                You're online
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Stat label="Trips" value="14" />
              <Stat label="Hours" value="6.2" />
              <Stat label="Rating" value="4.97" />
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Weekly goal</span>
                <span className="font-medium">$1,200</span>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-500 to-cyan-400"
                  style={{ width: "72%" }}
                />
              </div>
              <div className="mt-2 text-xs text-white/50">
                $864 earned · 3 days left
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <ListRow
                icon={<BadgeCheck className="h-4 w-4 text-brand-300" />}
                label="Documents verified"
              />
              <ListRow
                icon={<Wallet className="h-4 w-4 text-cyan-300" />}
                label="Instant payouts"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <span className="chip">For drivers</span>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Drive smarter.{" "}
            <span className="gradient-text">Earn on your terms.</span>
          </h2>
          <p className="mt-4 text-white/65 text-lg">
            Set your own counter-offers, see profitable rides at a glance, and
            withdraw earnings instantly. Zero hidden fees.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5 text-brand-300" />
              Real-time earnings analytics & insights
            </li>
            <li className="flex items-start gap-2">
              <BadgeCheck className="h-4 w-4 mt-0.5 text-brand-300" />
              Streamlined verification with document uploads
            </li>
            <li className="flex items-start gap-2">
              <Wallet className="h-4 w-4 mt-0.5 text-brand-300" />
              Withdraw earnings to bank, card, or crypto
            </li>
          </ul>
          <div className="mt-8">
            <Link href="/register?role=driver">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Apply to drive
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
      <div className="text-xs uppercase tracking-wider text-white/50">
        {label}
      </div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

function ListRow({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-sm">
      {icon}
      {label}
    </div>
  );
}

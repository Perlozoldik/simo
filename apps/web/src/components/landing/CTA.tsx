"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function CTA() {
  return (
    <section id="pricing" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-10 lg:p-14"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-500/15 via-transparent to-violet-500/15" />
          <div className="absolute inset-0 -z-10 bg-noise opacity-[0.4]" />

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="chip">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-300" />
                Trusted, verified, transparent
              </span>
              <h3 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
                The platform that{" "}
                <span className="gradient-text">moves with you</span>.
              </h3>
              <p className="mt-3 text-white/70 max-w-md">
                Whether you're catching a ride or driving one, Velora puts the
                power back in your hands.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
              <Link href="/register?role=rider">
                <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Sign up as rider
                </Button>
              </Link>
              <Link href="/register?role=driver">
                <Button size="lg" variant="ghost">
                  Drive with us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

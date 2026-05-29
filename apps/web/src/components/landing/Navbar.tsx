"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const navItems = [
  { label: "Riders", href: "#riders" },
  { label: "Drivers", href: "#drivers" },
  { label: "Safety", href: "#safety" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 backdrop-blur-xl bg-bg/60 border-b border-white/[0.06]"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="text-sm text-white/70 hover:text-white transition"
            >
              {it.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

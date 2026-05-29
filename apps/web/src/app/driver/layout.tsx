"use client";

import {
  BadgeCheck,
  Car,
  Gauge,
  ListChecks,
  Wallet,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import type { NavItem } from "@/components/layout/Sidebar";

const items: NavItem[] = [
  { label: "Dashboard", href: "/driver", icon: Gauge },
  { label: "Trips", href: "/driver/trips", icon: ListChecks },
  { label: "Earnings", href: "/driver/earnings", icon: Wallet },
  { label: "Verification", href: "/driver/verification", icon: BadgeCheck },
  { label: "Vehicle", href: "/driver/vehicle", icon: Car },
];

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      navItems={items}
      navTitle="Driver"
      topbarTitle="Velora Driver"
    >
      {children}
    </DashboardShell>
  );
}

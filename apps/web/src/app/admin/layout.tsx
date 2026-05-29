"use client";

import {
  AlertTriangle,
  Car,
  DollarSign,
  Gauge,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import type { NavItem } from "@/components/layout/Sidebar";

const items: NavItem[] = [
  { label: "Overview", href: "/admin", icon: Gauge },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Drivers", href: "/admin/drivers", icon: ShieldCheck },
  { label: "Live rides", href: "/admin/rides", icon: Car },
  { label: "Revenue", href: "/admin/revenue", icon: DollarSign },
  { label: "Fraud", href: "/admin/fraud", icon: AlertTriangle, badge: "3" },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      navItems={items}
      navTitle="Admin"
      topbarTitle="Velora Admin"
    >
      {children}
    </DashboardShell>
  );
}

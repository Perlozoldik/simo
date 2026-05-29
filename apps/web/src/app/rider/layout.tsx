"use client";

import { Bookmark, Car, History, MessageSquare, Wallet } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import type { NavItem } from "@/components/layout/Sidebar";

const items: NavItem[] = [
  { label: "Book a ride", href: "/rider", icon: Car },
  { label: "Trip history", href: "/rider/history", icon: History },
  { label: "Saved places", href: "/rider/saved", icon: Bookmark },
  { label: "Chat", href: "/rider/chat", icon: MessageSquare, badge: "2" },
  { label: "Wallet", href: "/rider/wallet", icon: Wallet },
];

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell navItems={items} navTitle="Rider" topbarTitle="Velora Rider">
      {children}
    </DashboardShell>
  );
}

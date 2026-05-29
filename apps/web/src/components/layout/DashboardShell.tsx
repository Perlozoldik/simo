"use client";

import { Sidebar, type NavItem } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardShell({
  navItems,
  navTitle,
  topbarTitle,
  children,
}: {
  navItems: NavItem[];
  navTitle?: string;
  topbarTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <Sidebar items={navItems} title={navTitle} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={topbarTitle} />
        <main className="flex-1 p-5 lg:p-7">{children}</main>
      </div>
    </div>
  );
}

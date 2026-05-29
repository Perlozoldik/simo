"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { type LucideIcon, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { useAuthStore } from "@/store/authStore";
import { setAccessToken } from "@/lib/api";
import { useRouter } from "next/navigation";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export function Sidebar({
  items,
  title,
}: {
  items: NavItem[];
  title?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const onLogout = () => {
    setAccessToken(null);
    logout();
    router.push("/login");
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/[0.06] bg-bg-subtle/40 backdrop-blur-xl">
      <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {title && (
          <div className="px-3 py-2 text-xs uppercase tracking-wider text-white/40">
            {title}
          </div>
        )}
        {items.map((it) => {
          const active =
            pathname === it.href ||
            (it.href !== "/" && pathname.startsWith(it.href));
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "text-white bg-white/[0.06]"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {active && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 -z-10 rounded-xl border border-brand-500/30 bg-brand-500/[0.08]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <it.icon className="h-4 w-4" />
              <span className="flex-1">{it.label}</span>
              {it.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300">
                  {it.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/[0.06]">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] transition"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

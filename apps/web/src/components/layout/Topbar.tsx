"use client";

import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useAuthStore } from "@/store/authStore";

export function Topbar({ title }: { title: string }) {
  const user = useAuthStore((s) => s.user);
  return (
    <header className="h-16 border-b border-white/[0.06] bg-bg-subtle/40 backdrop-blur-xl sticky top-0 z-30">
      <div className="h-full px-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2 w-72">
            <Search className="h-4 w-4 text-white/50" />
            <input
              placeholder="Search"
              className="bg-transparent text-sm placeholder:text-white/40 focus:outline-none w-full"
            />
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50">
              ⌘K
            </kbd>
          </div>
          <button
            aria-label="Notifications"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] transition relative"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand-400" />
          </button>
          <div className="flex items-center gap-3 rounded-xl px-2 py-1.5">
            <Avatar
              name={user?.name ?? "User"}
              src={user?.avatarUrl}
              size={36}
            />
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-medium">
                {user?.name ?? "Guest"}
              </div>
              <div className="text-xs text-white/50 capitalize">
                {user?.role?.toLowerCase() ?? "guest"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

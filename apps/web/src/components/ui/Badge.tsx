import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "success" | "warning" | "danger" | "info" | "violet";

const tones: Record<Tone, string> = {
  default: "bg-white/[0.06] text-white/70 border-white/[0.08]",
  success: "bg-brand-500/10 text-brand-300 border-brand-500/30",
  warning: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  danger: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  info: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
  violet: "bg-violet-500/10 text-violet-300 border-violet-500/30",
};

export function Badge({
  tone = "default",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

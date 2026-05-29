import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen grid lg:grid-cols-2">
      <div className="absolute inset-0 -z-10 bg-grid-fade" />
      <div className="hidden lg:flex flex-col justify-between p-10 border-r border-white/[0.06] bg-bg-subtle/40 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <Link href="/">
          <Logo />
        </Link>
        <div className="space-y-4 max-w-md">
          <h2 className="text-3xl font-semibold tracking-tight">
            The ride-hailing platform built for{" "}
            <span className="gradient-text">a fairer road</span>.
          </h2>
          <p className="text-white/65">
            Negotiate fares, track drivers in real time, and pay your way —
            join 2.4M riders and 180k drivers already on Velora.
          </p>
        </div>
        <div className="text-xs text-white/40">
          © {new Date().getFullYear()} Velora Mobility, Inc.
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-6 sm:p-10">
        <div className="lg:hidden mb-8">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

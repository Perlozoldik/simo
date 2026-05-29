import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const groups = [
  {
    title: "Product",
    items: [
      { label: "Riders", href: "#riders" },
      { label: "Drivers", href: "#drivers" },
      { label: "Safety", href: "#safety" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-14">
      <div className="container grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-3">
          <Logo />
          <p className="text-sm text-white/55 max-w-sm">
            Velora is a next-generation ride-hailing platform built for
            transparency, fairness, and speed.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <div className="text-xs uppercase tracking-wider text-white/50">
              {g.title}
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {g.items.map((it) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    className="text-white/75 hover:text-white transition"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <span>© {new Date().getFullYear()} Velora Mobility, Inc.</span>
        <span>Built with Next.js · Express · Prisma · Socket.io</span>
      </div>
    </footer>
  );
}

"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const trips = [
  {
    id: "t_001",
    date: "May 28, 2026",
    from: "Marina Bay",
    to: "Changi Airport T3",
    fare: 24.5,
    status: "completed" as const,
    driver: "Marco R.",
  },
  {
    id: "t_002",
    date: "May 25, 2026",
    from: "Orchard Rd",
    to: "Sentosa",
    fare: 14.0,
    status: "completed" as const,
    driver: "Aisha K.",
  },
  {
    id: "t_003",
    date: "May 20, 2026",
    from: "Jurong East",
    to: "Bugis",
    fare: 11.5,
    status: "cancelled" as const,
    driver: "Devon L.",
  },
];

export default function HistoryPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trip history</h1>
        <p className="text-sm text-white/55">
          A record of every ride you've taken with Velora.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent trips</CardTitle>
          <Badge tone="info">{trips.length} trips</Badge>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-white/[0.06]">
            {trips.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-12 items-center px-5 py-4 hover:bg-white/[0.02]"
              >
                <div className="col-span-3 text-sm text-white/65">{t.date}</div>
                <div className="col-span-5 text-sm">
                  <div className="font-medium">
                    {t.from} → {t.to}
                  </div>
                  <div className="text-xs text-white/55">with {t.driver}</div>
                </div>
                <div className="col-span-2">
                  <Badge
                    tone={t.status === "completed" ? "success" : "danger"}
                  >
                    {t.status}
                  </Badge>
                </div>
                <div className="col-span-2 text-right text-sm font-semibold">
                  {formatCurrency(t.fare)}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

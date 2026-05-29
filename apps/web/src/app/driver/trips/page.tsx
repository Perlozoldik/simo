"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const trips = [
  { id: "1", time: "10:42", from: "Marina Bay", to: "Changi T3", fare: 24.5, status: "Completed" },
  { id: "2", time: "09:18", from: "Bugis", to: "Sentosa", fare: 18, status: "Completed" },
  { id: "3", time: "08:51", from: "Tampines", to: "Orchard", fare: 22.5, status: "Completed" },
  { id: "4", time: "08:02", from: "Jurong East", to: "Bukit Timah", fare: 12, status: "Cancelled" },
];

export default function TripsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trips</h1>
        <p className="text-sm text-white/55">All your recent rides.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Today</CardTitle>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-white/[0.06]">
            {trips.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-12 items-center px-5 py-4 hover:bg-white/[0.02]"
              >
                <div className="col-span-2 text-sm text-white/65">{t.time}</div>
                <div className="col-span-6 text-sm">
                  {t.from} → {t.to}
                </div>
                <div className="col-span-2">
                  <Badge tone={t.status === "Completed" ? "success" : "danger"}>
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

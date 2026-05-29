"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const drivers = [
  { id: "d1", name: "Marco R.", vehicle: "Toyota Camry", status: "online", trips: 1284, rating: 4.97, verification: "verified" },
  { id: "d2", name: "Aisha K.", vehicle: "Tesla Model 3", status: "online", trips: 942, rating: 4.95, verification: "verified" },
  { id: "d3", name: "Devon L.", vehicle: "Hyundai Sonata", status: "offline", trips: 510, rating: 4.86, verification: "pending" },
];

export default function DriversPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Drivers</h1>
        <p className="text-sm text-white/55">Verification, onboarding, and performance.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All drivers</CardTitle>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-white/[0.06]">
            {drivers.map((d) => (
              <div
                key={d.id}
                className="grid grid-cols-12 items-center px-5 py-4 hover:bg-white/[0.02]"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <Avatar name={d.name} />
                  <div>
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-white/55">{d.vehicle}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Badge tone={d.status === "online" ? "success" : "default"}>
                    {d.status}
                  </Badge>
                </div>
                <div className="col-span-2 text-sm">{d.trips} trips</div>
                <div className="col-span-2 text-sm">★ {d.rating}</div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Badge
                    tone={d.verification === "verified" ? "success" : "warning"}
                  >
                    {d.verification}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

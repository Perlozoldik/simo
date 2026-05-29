import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapCanvas } from "@/components/map/MapCanvas";
import { formatCurrency } from "@/lib/utils";

const rides = [
  { id: "r1", route: "Marina Bay → Changi T3", driver: "Marco R.", eta: "4 min", fare: 24.5, status: "in progress" },
  { id: "r2", route: "Bugis → Sentosa", driver: "Aisha K.", eta: "11 min", fare: 18, status: "in progress" },
  { id: "r3", route: "Tampines → Orchard", driver: "Devon L.", eta: "7 min", fare: 22.5, status: "in progress" },
  { id: "r4", route: "Jurong East → Holland V", driver: "Priya S.", eta: "—", fare: 14, status: "completed" },
];

export default function LiveRidesPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Live rides</h1>
        <p className="text-sm text-white/55">
          Monitor every ongoing ride across the city.
        </p>
      </div>
      <div className="grid lg:grid-cols-[1fr_420px] gap-5">
        <Card className="overflow-hidden">
          <MapCanvas className="h-[520px]" driverLabel="3 drivers visible" />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active</CardTitle>
            <Badge tone="info">{rides.length} rides</Badge>
          </CardHeader>
          <CardBody className="p-0 max-h-[520px] overflow-auto">
            <div className="divide-y divide-white/[0.06]">
              {rides.map((r) => (
                <div key={r.id} className="px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{r.route}</div>
                    <Badge
                      tone={r.status === "completed" ? "default" : "success"}
                    >
                      {r.status}
                    </Badge>
                  </div>
                  <div className="mt-1 text-xs text-white/55">
                    {r.driver} · ETA {r.eta}
                  </div>
                  <div className="mt-2 text-sm font-semibold">
                    {formatCurrency(r.fare)}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

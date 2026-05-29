import { AlertTriangle } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const alerts = [
  {
    id: "a1",
    severity: "high",
    title: "Card velocity spike",
    detail: "12 cards from same IP within 1h",
    user: "203.0.113.42",
    at: "2m ago",
  },
  {
    id: "a2",
    severity: "high",
    title: "Account takeover suspected",
    detail: "5 password resets in 3 minutes",
    user: "lina@p.com",
    at: "6m ago",
  },
  {
    id: "a3",
    severity: "medium",
    title: "Surge anomaly · downtown",
    detail: "Predicted demand >180% baseline",
    user: "—",
    at: "9m ago",
  },
  {
    id: "a4",
    severity: "low",
    title: "Driver doc near expiry",
    detail: "37 drivers in next 14d",
    user: "system",
    at: "1h ago",
  },
];

const tone = (s: string) =>
  s === "high" ? "danger" : s === "medium" ? "warning" : "info";

export default function FraudPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Fraud detection
          </h1>
          <p className="text-sm text-white/55">
            Real-time anomaly alerts from the AI risk engine.
          </p>
        </div>
        <Badge tone="danger">
          <AlertTriangle className="h-3.5 w-3.5" />
          {alerts.filter((a) => a.severity === "high").length} high severity
        </Badge>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent alerts</CardTitle>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-white/[0.06]">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="grid grid-cols-12 items-center px-5 py-4 hover:bg-white/[0.02]"
              >
                <div className="col-span-2">
                  <Badge
                    tone={tone(a.severity) as "danger" | "warning" | "info"}
                  >
                    {a.severity}
                  </Badge>
                </div>
                <div className="col-span-6">
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-white/55">{a.detail}</div>
                </div>
                <div className="col-span-2 text-xs text-white/65">{a.user}</div>
                <div className="col-span-2 text-right text-xs text-white/45">
                  {a.at}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

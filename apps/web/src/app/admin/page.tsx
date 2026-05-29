"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Car,
  DollarSign,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

const kpis = [
  { label: "Active riders", value: "12,486", delta: "+8.2%", icon: Users },
  { label: "Online drivers", value: "1,284", delta: "+3.1%", icon: UserCheck },
  { label: "Live rides", value: "342", delta: "+12.6%", icon: Car },
  { label: "Today revenue", value: formatCurrency(28430.5), delta: "+5.4%", icon: DollarSign },
];

const alerts = [
  { severity: "high", title: "Suspicious payment cluster", detail: "12 cards from same IP within 1h", at: "2m ago" },
  { severity: "med", title: "Surge anomaly · downtown", detail: "Predicted demand >180% baseline", at: "9m ago" },
  { severity: "low", title: "Driver doc near expiry", detail: "37 drivers in next 14d", at: "1h ago" },
];

const liveRides = [
  { id: "ride_001", rider: "Lina P.", driver: "Marco R.", route: "Marina Bay → Changi T3", fare: 24.5, eta: "4 min" },
  { id: "ride_002", rider: "Kenji T.", driver: "Aisha K.", route: "Bugis → Sentosa", fare: 18, eta: "11 min" },
  { id: "ride_003", rider: "Sara L.", driver: "Devon L.", route: "Tampines → Orchard", fare: 22.5, eta: "7 min" },
];

const tone = (s: string) => (s === "high" ? "danger" : s === "med" ? "warning" : "info");

export default function AdminHomePage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <p className="text-sm text-white/55">
            Live operational metrics across the platform.
          </p>
        </div>
        <Badge tone="success">All systems healthy</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardBody>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-white/50">
                    {k.label}
                  </span>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] border border-white/[0.06]">
                    <k.icon className="h-4 w-4 text-brand-300" />
                  </span>
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">
                  {k.value}
                </div>
                <div className="mt-1 text-xs text-brand-300 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {k.delta} vs. yesterday
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live rides</CardTitle>
            <Badge tone="info">{liveRides.length} ongoing</Badge>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-white/[0.06]">
              {liveRides.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-12 items-center px-5 py-4 hover:bg-white/[0.02]"
                >
                  <div className="col-span-5">
                    <div className="text-sm font-medium">{r.route}</div>
                    <div className="text-xs text-white/55">
                      {r.rider} · {r.driver}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <Badge tone="success">in progress</Badge>
                  </div>
                  <div className="col-span-2 text-sm text-white/70">{r.eta}</div>
                  <div className="col-span-2 text-right text-sm font-semibold">
                    {formatCurrency(r.fare)}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fraud alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </CardHeader>
          <CardBody className="space-y-3">
            {alerts.map((a, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3"
              >
                <div className="flex items-center justify-between">
                  <Badge tone={tone(a.severity) as "danger" | "warning" | "info"}>
                    {a.severity.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-white/45">{a.at}</span>
                </div>
                <div className="mt-2 text-sm font-medium">{a.title}</div>
                <div className="text-xs text-white/55">{a.detail}</div>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

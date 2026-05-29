"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  Star,
  Timer,
  Car,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { MapCanvas } from "@/components/map/MapCanvas";
import { formatCurrency } from "@/lib/utils";

type Request = {
  id: string;
  rider: string;
  rating: number;
  pickup: string;
  dropoff: string;
  proposed: number;
  distanceKm: number;
};

const initialRequests: Request[] = [
  {
    id: "r1",
    rider: "Lina P.",
    rating: 4.9,
    pickup: "Marina Bay",
    dropoff: "Changi Airport T3",
    proposed: 24.5,
    distanceKm: 21.2,
  },
  {
    id: "r2",
    rider: "Kenji T.",
    rating: 4.7,
    pickup: "Bugis",
    dropoff: "Sentosa",
    proposed: 18,
    distanceKm: 14.4,
  },
];

export default function DriverHomePage() {
  const [online, setOnline] = useState(true);
  const [requests, setRequests] = useState(initialRequests);

  const stats = [
    { label: "Today", value: formatCurrency(284.4), icon: TrendingUp },
    { label: "Trips", value: "14", icon: Car },
    { label: "Rating", value: "4.97", icon: Star },
    { label: "Hours", value: "6.2", icon: Timer },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Good morning, Marco
          </h1>
          <p className="text-sm text-white/55">
            {online
              ? "You're visible to nearby riders."
              : "Go online to start receiving ride requests."}
          </p>
        </div>
        <button
          onClick={() => setOnline((v) => !v)}
          className={`flex items-center gap-2 rounded-xl px-4 py-3 border transition ${
            online
              ? "bg-brand-500/10 border-brand-500/40 text-brand-300"
              : "bg-white/[0.04] border-white/[0.08] text-white/70"
          }`}
        >
          {online ? (
            <ToggleRight className="h-5 w-5" />
          ) : (
            <ToggleLeft className="h-5 w-5" />
          )}
          {online ? "Online" : "Go online"}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardBody className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-300">
                <s.icon className="h-4 w-4" />
              </span>
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50">
                  {s.label}
                </div>
                <div className="text-xl font-semibold tracking-tight">
                  {s.value}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-5">
        <Card className="overflow-hidden">
          <MapCanvas
            className="h-[480px]"
            driverLabel={online ? "You · online" : "You · offline"}
          />
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Incoming requests</CardTitle>
            <Badge tone="success">{requests.length} new</Badge>
          </CardHeader>
          <CardBody className="p-0 max-h-[480px] overflow-auto">
            <AnimatePresence>
              {requests.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  className="px-5 py-4 border-b border-white/[0.06] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Avatar name={r.rider} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{r.rider}</div>
                      <div className="text-xs text-white/55">
                        ★ {r.rating} · {r.distanceKm} km trip
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-semibold">
                        {formatCurrency(r.proposed)}
                      </div>
                      <div className="text-[10px] text-white/45 uppercase tracking-wider">
                        proposed
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-white/70 truncate">
                    {r.pickup} → {r.dropoff}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setRequests((rs) => rs.filter((x) => x.id !== r.id))
                      }
                    >
                      Counter
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<CheckCircle2 className="h-4 w-4" />}
                      onClick={() =>
                        setRequests((rs) => rs.filter((x) => x.id !== r.id))
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      leftIcon={<XCircle className="h-4 w-4" />}
                      onClick={() =>
                        setRequests((rs) => rs.filter((x) => x.id !== r.id))
                      }
                    >
                      Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {requests.length === 0 && (
              <div className="p-8 text-center text-sm text-white/50">
                No requests yet. We'll notify you instantly.
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowDownToLine, TrendingUp } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

const week = [
  { d: "Mon", v: 162 },
  { d: "Tue", v: 198 },
  { d: "Wed", v: 174 },
  { d: "Thu", v: 230 },
  { d: "Fri", v: 284 },
  { d: "Sat", v: 312 },
  { d: "Sun", v: 0 },
];
const max = Math.max(...week.map((w) => w.v));

export default function EarningsPage() {
  const total = week.reduce((s, w) => s + w.v, 0);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Earnings</h1>
          <p className="text-sm text-white/55">
            Your weekly performance and payout options.
          </p>
        </div>
        <Button leftIcon={<ArrowDownToLine className="h-4 w-4" />}>
          Withdraw
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wider text-white/50">
              Available balance
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              {formatCurrency(1247.6)}
            </div>
            <div className="mt-2 text-xs text-white/55">
              Next auto-payout in 2 days
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wider text-white/50">
              This week
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              {formatCurrency(total)}
            </div>
            <div className="mt-2 text-xs text-brand-300 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              +18% vs. last week
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wider text-white/50">
              Avg. per trip
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              {formatCurrency(19.84)}
            </div>
            <div className="mt-2 text-xs text-white/55">
              63 trips this week
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly trend</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex items-end gap-3 h-48">
            {week.map((w, i) => (
              <div
                key={w.d}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(w.v / max) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className="w-full max-w-[40px] rounded-md bg-gradient-to-t from-brand-500/30 to-brand-400 border border-brand-400/40"
                />
                <div className="text-xs text-white/55">{w.d}</div>
                <div className="text-xs font-medium">{formatCurrency(w.v)}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

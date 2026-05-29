"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

const months = [
  { m: "Jan", v: 84200 },
  { m: "Feb", v: 92100 },
  { m: "Mar", v: 110400 },
  { m: "Apr", v: 128300 },
  { m: "May", v: 154200 },
];
const max = Math.max(...months.map((m) => m.v));

export default function RevenuePage() {
  const total = months.reduce((s, m) => s + m.v, 0);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Revenue</h1>
        <p className="text-sm text-white/55">
          Platform-wide revenue performance.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wider text-white/50">YTD</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              {formatCurrency(total)}
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wider text-white/50">Avg. take rate</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">15.3%</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-xs uppercase tracking-wider text-white/50">Refund rate</div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">0.42%</div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Monthly trend</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex items-end gap-3 h-56">
            {months.map((m, i) => (
              <div key={m.m} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.v / max) * 100}%` }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  className="w-full max-w-[44px] rounded-md bg-gradient-to-t from-violet-500/30 to-cyan-400 border border-cyan-400/40"
                />
                <div className="text-xs text-white/55">{m.m}</div>
                <div className="text-xs font-medium">{formatCurrency(m.v)}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

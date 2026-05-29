"use client";

import { Bitcoin, CreditCard, Plus, Wallet } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const methods = [
  { id: "1", brand: "Visa", last4: "4242", primary: true, icon: CreditCard },
  { id: "2", brand: "PayPal", last4: "—", primary: false, icon: Wallet },
  { id: "3", brand: "USDC", last4: "0x9e..3a", primary: false, icon: Bitcoin },
];

export default function WalletPage() {
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Wallet</h1>
          <p className="text-sm text-white/55">
            Manage payment methods and promo codes.
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Add method</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Payment methods</CardTitle>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-white/[0.06]">
            {methods.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <m.icon className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="font-medium">{m.brand}</div>
                  <div className="text-sm text-white/55">{m.last4}</div>
                </div>
                {m.primary && <Badge tone="success">Primary</Badge>}
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
  const [commission, setCommission] = useState("15");
  const [surgeMin, setSurgeMin] = useState("1.0");
  const [surgeMax, setSurgeMax] = useState("3.0");

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-white/55">
          Commission, surge, and platform-wide configuration.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Platform commission (%)"
            type="number"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            hint="Applied to every completed ride"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              label="Min surge multiplier"
              type="number"
              step="0.1"
              value={surgeMin}
              onChange={(e) => setSurgeMin(e.target.value)}
            />
            <Input
              label="Max surge multiplier"
              type="number"
              step="0.1"
              value={surgeMax}
              onChange={(e) => setSurgeMax(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button>Save changes</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

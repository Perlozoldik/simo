"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function VehiclePage() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Vehicle</h1>
        <p className="text-sm text-white/55">
          Keep your vehicle details up to date.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active vehicle</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Make" defaultValue="Toyota" />
            <Input label="Model" defaultValue="Camry" />
            <Input label="Year" defaultValue="2023" />
            <Input label="Color" defaultValue="Black" />
            <Input label="Plate number" defaultValue="SG 8821 P" />
            <Input label="Capacity" defaultValue="4" />
          </div>
          <div className="flex justify-end">
            <Button>Save changes</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

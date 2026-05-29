"use client";

import { Briefcase, Heart, Home, MapPin, Plus } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const places = [
  { icon: Home, label: "Home", address: "12 Marine Parade Rd, SG" },
  { icon: Briefcase, label: "Work", address: "1 Raffles Pl, Tower 2, SG" },
  { icon: Heart, label: "Mom's place", address: "88 Tampines Ave, SG" },
];

export default function SavedPage() {
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Saved places
          </h1>
          <p className="text-sm text-white/55">
            One tap to set pickup or destination.
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Add place</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your places</CardTitle>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-white/[0.06]">
            {places.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <p.icon className="h-4 w-4 text-brand-300" />
                </span>
                <div className="flex-1">
                  <div className="font-medium">{p.label}</div>
                  <div className="text-sm text-white/55 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {p.address}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

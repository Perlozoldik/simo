"use client";

import { CheckCircle2, FileUp, Clock, AlertCircle } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type Status = "verified" | "pending" | "missing";
const docs: { name: string; status: Status; description: string }[] = [
  {
    name: "Driver license",
    status: "verified",
    description: "Issued by SG, expires 2031",
  },
  {
    name: "National ID",
    status: "verified",
    description: "Singapore IC",
  },
  {
    name: "Vehicle registration",
    status: "pending",
    description: "Awaiting review · ~24h",
  },
  {
    name: "Insurance certificate",
    status: "missing",
    description: "Required to start driving",
  },
];

const tone = (s: Status) =>
  s === "verified" ? "success" : s === "pending" ? "warning" : "danger";

const Icon = ({ s }: { s: Status }) =>
  s === "verified" ? (
    <CheckCircle2 className="h-4 w-4 text-brand-300" />
  ) : s === "pending" ? (
    <Clock className="h-4 w-4 text-amber-300" />
  ) : (
    <AlertCircle className="h-4 w-4 text-rose-300" />
  );

export default function VerificationPage() {
  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Verification</h1>
        <p className="text-sm text-white/55">
          Upload required documents. We'll review them within 24 hours.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-white/[0.06]">
            {docs.map((d) => (
              <div
                key={d.name}
                className="px-5 py-4 flex items-center gap-4 hover:bg-white/[0.02]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <Icon s={d.status} />
                </span>
                <div className="flex-1">
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-white/55">{d.description}</div>
                </div>
                <Badge tone={tone(d.status)}>{d.status}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<FileUp className="h-4 w-4" />}
                >
                  {d.status === "verified" ? "Replace" : "Upload"}
                </Button>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

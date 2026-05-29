"use client";

import { Search, Ban, ShieldCheck } from "lucide-react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";

const users = [
  { id: "u1", name: "Lina P.", email: "lina@p.com", role: "RIDER", status: "active" },
  { id: "u2", name: "Kenji T.", email: "kenji@t.com", role: "RIDER", status: "active" },
  { id: "u3", name: "Marco R.", email: "marco@r.com", role: "DRIVER", status: "active" },
  { id: "u4", name: "Aisha K.", email: "aisha@k.com", role: "DRIVER", status: "suspended" },
];

export default function UsersPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
        <p className="text-sm text-white/55">
          Manage all riders and drivers.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All users</CardTitle>
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 w-72">
            <Search className="h-4 w-4 text-white/50" />
            <input
              placeholder="Search by name or email"
              className="bg-transparent text-sm placeholder:text-white/40 focus:outline-none w-full"
            />
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-white/[0.06]">
            {users.map((u) => (
              <div
                key={u.id}
                className="grid grid-cols-12 items-center px-5 py-4 hover:bg-white/[0.02]"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <Avatar name={u.name} />
                  <div>
                    <div className="font-medium">{u.name}</div>
                    <div className="text-xs text-white/55">{u.email}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Badge tone={u.role === "DRIVER" ? "violet" : "info"}>
                    {u.role}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <Badge tone={u.status === "active" ? "success" : "danger"}>
                    {u.status}
                  </Badge>
                </div>
                <div className="col-span-3 flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<ShieldCheck className="h-4 w-4" />}
                  >
                    Verify
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<Ban className="h-4 w-4" />}
                  >
                    Ban
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { api } from "@/lib/api";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing verification token.");
      return;
    }
    api
      .post("/auth/verify-email", { token })
      .then(() => {
        setStatus("success");
        setMessage("Your email is verified. You're all set.");
      })
      .catch((e) => {
        setStatus("error");
        setMessage(
          e?.response?.data?.message ?? "Could not verify your email."
        );
      });
  }, [token]);

  return (
    <div className="space-y-4 text-center">
      <div className="grid h-14 w-14 mx-auto place-items-center rounded-2xl bg-white/[0.04] border border-white/[0.06]">
        {status === "loading" && (
          <Loader2 className="h-6 w-6 animate-spin text-brand-300" />
        )}
        {status === "success" && (
          <CheckCircle2 className="h-7 w-7 text-brand-300" />
        )}
        {status === "error" && <XCircle className="h-7 w-7 text-rose-400" />}
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">
        {status === "loading"
          ? "Verifying your email"
          : status === "success"
            ? "Email verified"
            : "Verification failed"}
      </h1>
      <p className="text-sm text-white/60">{message}</p>
      <Link
        href="/login"
        className="inline-block text-sm text-brand-300 hover:text-brand-200"
      >
        Continue to sign in
      </Link>
    </div>
  );
}

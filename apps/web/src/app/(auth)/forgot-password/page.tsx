"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";

const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", values);
      setSent(true);
    } catch {
      toast.error("Could not send reset email");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Check your inbox</h1>
        <p className="text-sm text-white/60">
          If an account exists for that email, we just sent a link to reset
          your password.
        </p>
        <Link
          href="/login"
          className="inline-block text-sm text-brand-300 hover:text-brand-200"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Reset password
        </h1>
        <p className="mt-1 text-sm text-white/60">
          We'll email you a secure link to choose a new password.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@velora.app"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register("email")}
        />
        <Button type="submit" loading={loading} className="w-full">
          Send reset link
        </Button>
      </form>
      <p className="text-center text-sm text-white/60">
        Remembered it?{" "}
        <Link href="/login" className="text-brand-300 hover:text-brand-200">
          Sign in
        </Link>
      </p>
    </div>
  );
}

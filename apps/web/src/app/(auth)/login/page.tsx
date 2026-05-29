"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { api, setAccessToken } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { data } = await api.post("/auth/login", values);
      setAccessToken(data.accessToken);
      setUser(data.user);
      toast.success("Welcome back!");
      const role: string = data.user.role;
      router.push(
        role === "ADMIN" ? "/admin" : role === "DRIVER" ? "/driver" : "/rider"
      );
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm text-white/60">
          Sign in to continue your journey on Velora.
        </p>
      </div>

      <GoogleButton />

      <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        or with email
        <span className="h-px flex-1 bg-white/10" />
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
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register("password")}
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-white/70">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/[0.04]"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-brand-300 hover:text-brand-200"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" loading={submitting} className="w-full">
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-white/60">
        New to Velora?{" "}
        <Link
          href="/register"
          className="text-brand-300 hover:text-brand-200 font-medium"
        >
          Create an account
        </Link>
      </p>
    </motion.div>
  );
}

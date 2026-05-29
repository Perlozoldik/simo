"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { api, setAccessToken } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "At least 8 characters"),
    role: z.enum(["RIDER", "DRIVER"]),
  })
  .strict();
type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const params = useSearchParams();
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const initialRole =
    params.get("role")?.toUpperCase() === "DRIVER" ? "DRIVER" : "RIDER";

  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: initialRole },
  });
  const role = watch("role");

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { data } = await api.post("/auth/register", values);
      setAccessToken(data.accessToken);
      setUser(data.user);
      toast.success("Account created — check your email to verify.");
      router.push(values.role === "DRIVER" ? "/driver" : "/rider");
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? "Could not create account");
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
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Start riding or driving on Velora in under a minute.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
        {(["RIDER", "DRIVER"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setValue("role", r)}
            className={cn(
              "rounded-lg py-2 text-sm font-medium transition",
              role === r
                ? "bg-brand-500 text-black"
                : "text-white/70 hover:text-white"
            )}
          >
            {r === "RIDER" ? "I'm a Rider" : "I'm a Driver"}
          </button>
        ))}
      </div>

      <GoogleButton label="Sign up with Google" />

      <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        or with email
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Alex Morgan"
          leftIcon={<User className="h-4 w-4" />}
          error={errors.name?.message}
          {...register("name")}
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" loading={submitting} className="w-full">
          Create account
        </Button>
        <p className="text-xs text-white/45 text-center">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </form>

      <p className="text-center text-sm text-white/60">
        Already a member?{" "}
        <Link
          href="/login"
          className="text-brand-300 hover:text-brand-200 font-medium"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

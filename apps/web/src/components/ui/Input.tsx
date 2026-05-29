"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || React.useId();
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="label">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-rose-500/60 focus:ring-rose-500/40",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
              {rightIcon}
            </span>
          )}
        </div>
        {hint && !error && <p className="text-xs text-white/50">{hint}</p>}
        {error && <p className="text-xs text-rose-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

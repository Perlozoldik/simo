"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";

type AuthState = {
  user: User | null;
  hydrated: boolean;
  setUser: (u: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "velora-auth",
      onRehydrateStorage: () => (state) => {
        state?.hydrated && (state.hydrated = true);
      },
    }
  )
);

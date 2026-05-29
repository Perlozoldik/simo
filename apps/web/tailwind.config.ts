import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#07090d",
          subtle: "#0b0e14",
          elevated: "#11141c",
        },
        line: "rgba(255,255,255,0.08)",
        brand: {
          50: "#ecfff7",
          100: "#d2ffec",
          200: "#a7ffd8",
          300: "#6dffbe",
          400: "#33f59d",
          500: "#06d77b",
          600: "#00b56a",
          700: "#008f57",
          800: "#067047",
          900: "#075c3c",
        },
        accent: {
          violet: "#8b5cf6",
          cyan: "#22d3ee",
          rose: "#f43f5e",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(6,215,123,0.12), transparent 50%), radial-gradient(circle at 90% 80%, rgba(139,92,246,0.10), transparent 50%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.04 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px -20px rgba(6,215,123,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.6)", opacity: "0.7" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 400ms ease-out both",
        shimmer: "shimmer 2.4s linear infinite",
        pulseRing: "pulseRing 1.8s cubic-bezier(0.215,0.61,0.355,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

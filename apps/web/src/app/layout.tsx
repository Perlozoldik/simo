import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Velora — Ride your way",
    template: "%s · Velora",
  },
  description:
    "Velora is a modern ride-hailing platform. Negotiate fares, track drivers in real time, and ride safely.",
  metadataBase: new URL("https://velora.app"),
  openGraph: {
    title: "Velora — Ride your way",
    description:
      "Negotiate fares, live driver tracking, in-app chat, multiple payments. Built for the new generation of riders and drivers.",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#07090d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen font-sans">
        {children}
        <Toaster
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(17,20,28,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              backdropFilter: "blur(16px)",
            },
          }}
        />
      </body>
    </html>
  );
}

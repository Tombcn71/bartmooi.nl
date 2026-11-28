import "./kantoor.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

/** De kantoor-app (kantoor.bartmooi.nl): eigen opmaak, los van de website. */
export const metadata: Metadata = {
  title: "BartMooi Team",
  robots: { index: false, follow: false },
  manifest: "/kantoor/manifest.webmanifest",
  appleWebApp: { capable: true, title: "BartMooi", statusBarStyle: "default" },
  icons: { apple: "/kantoor/apple-touch-icon.png", icon: "/kantoor/icon-192.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1E5079" };

export default function KantoorLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}

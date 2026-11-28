import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Werkbonnen", description: "Werkbonnen van BartMooi: uren per monteur per week.", robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "BartMooi", statusBarStyle: "default" },
  icons: { apple: "/apple-touch-icon.png", icon: "/icons/icon-192.png" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1E5079" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}

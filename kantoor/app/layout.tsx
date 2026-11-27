import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Werkbonnen", description: "Werkbonnen van BartMooi: uren per monteur per week.", robots: { index: false, follow: false } };
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}

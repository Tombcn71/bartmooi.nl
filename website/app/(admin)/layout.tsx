import "../globals.css";
import type { ReactNode } from "react";

export const metadata = { title: "BartMooi beheer", robots: { index: false, follow: false } };

/** Eigen, kale opmaak voor het beheer: geen menu of voettekst van de website. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-dvh bg-[#f4f6f8] text-slate-900">{children}</body>
    </html>
  );
}

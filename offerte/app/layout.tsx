import type { Metadata } from "next";
import { Overpass, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CenterToast } from "./components/CenterToast";
import { InmeetBalk } from "./components/InmeetBalk";
import { NavGate } from "./components/NavGate";
import { AssistentGlobaal } from "./components/AssistentGlobaal";
import { Telling } from "./components/Telling";
import { headers } from "next/headers";
import { TaalProvider } from "./components/TaalContext";
import { naarTaal } from "@/lib/taal";

// Huisstijl bartmooi.nl
const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BartMooi - Kozijnen op maat",
  description: "Vakmanschap dat het verschil maakt voor jouw woning.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const taal = naarTaal((await headers()).get("x-bm-taal"));
  return (
    <html
      lang={taal}
      className={`${overpass.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <TaalProvider taal={taal}>
        <NavGate>
          <Navbar />
          <InmeetBalk />
        </NavGate>

        {/* De rest van de pagina (children) komt hieronder */}
        <main className="flex-grow">{children}</main>
        <CenterToast />
        <AssistentGlobaal />
        <Telling />
        </TaalProvider>
      </body>
    </html>
  );
}

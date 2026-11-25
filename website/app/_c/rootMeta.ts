import type { Metadata, Viewport } from "next";
import { OG_TAAL, type Taal } from "../_i18n/talen";
import { vertaal } from "../_i18n";

/** Metagegevens die voor de hele site gelden (per taal). */
export function rootMeta(taal: Taal): Metadata {
  return {
    metadataBase: new URL("https://bartmooi.nl"),
    applicationName: "BartMooi",
    authors: [{ name: "BartMooi B.V.", url: "https://bartmooi.nl/" }],
    alternates: { types: { "application/rss+xml": "/feed.xml" } },
    openGraph: { locale: OG_TAAL[taal], siteName: "BartMooi" },
    robots: process.env.NOINDEX
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    title: { default: vertaal(taal, "Kunststof en aluminium kozijnen op maat | BartMooi B.V"), template: "%s" },
    description: vertaal(taal, "Kozijnen, deuren, schuifpuien, rolluiken en gratis inmeting. Duitse kwaliteit, Poolse prijzen. Voor particulieren en VvE’s in Nederland."),
  };
}
export const viewport: Viewport = { themeColor: "#13334d" };

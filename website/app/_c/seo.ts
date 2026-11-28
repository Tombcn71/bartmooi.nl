import type { Metadata } from "next";
import { seo } from "../_content/seo";
import { ACTIEF, HTML_TAAL, OG_TAAL, PADEN, pad, type Taal } from "../_i18n/talen";
import { vertaal } from "../_i18n";

export const SITE = "https://www.bartmooi.nl";

/** hreflang: de talen waarin deze pagina echt bestaat (alleen actieve talen), met x-default naar het Nederlands. */
export function talen(padNl: string): Record<string, string> {
  const uit: Record<string, string> = { "nl-NL": `${SITE}${padNl}`, "x-default": `${SITE}${padNl}` };
  for (const taal of ACTIEF) if (taal !== "nl" && PADEN[padNl]?.[taal]) uit[HTML_TAAL[taal]] = `${SITE}${PADEN[padNl][taal]}`;
  return uit;
}

/** Titel, beschrijving en afbeelding van een pagina (per taal), plus canonical, hreflang en Open Graph. */
export function meta(padNl: string, taalOfExtra: Taal | Partial<Metadata> = "nl", extra: Partial<Metadata> = {}): Metadata {
  const taal: Taal = typeof taalOfExtra === "string" ? taalOfExtra : "nl";
  const opties = typeof taalOfExtra === "string" ? extra : taalOfExtra;
  const s = seo[padNl];
  const titel = vertaal(taal, s?.title || "BartMooi");
  const beschrijving = s?.description ? vertaal(taal, s.description) : undefined;
  const eigen = pad(padNl, taal);
  const url = `${SITE}${eigen}`;
  return {
    title: { absolute: titel },
    description: beschrijving,
    alternates: { canonical: url, languages: taal === "nl" ? talen(padNl) : talen(padNl) },
    openGraph: { type: padNl === "/" ? "website" : "article", locale: OG_TAAL[taal], siteName: "BartMooi", title: titel, description: s?.ogDescription ?? beschrijving, url, images: s?.og ? [`${SITE}/img/og/${s.og}`] : undefined },
    twitter: { card: "summary_large_image", title: titel, description: beschrijving },
    ...opties,
  };
}

import { cacheLife, cacheTag } from "next/cache";
import { t } from "../_i18n";

export type Prijsvoorbeeld = { product: string; type: string; naam: string; breedteMm: number; hoogteMm: number; glas?: "dubbel" | "triple"; prijs: number; inclusief: string };

const URL = process.env.PRIJZEN_URL ?? "https://offerte.bartmooi.nl/api/prijzen";

/** Voorbeeldprijzen uit dezelfde berekening als de calculator en de AI-assistent (één bron). Geen gegevens? Dan toont de site geen prijzen. */
export async function haalPrijzen(): Promise<Prijsvoorbeeld[]> {
  "use cache";
  cacheTag("prijzen");
  try {
    const r = await fetch(URL, { signal: AbortSignal.timeout(8000) });
    const d = r.ok ? ((await r.json()) as { items?: Prijsvoorbeeld[] }) : {};
    const items = Array.isArray(d.items) ? d.items.filter((i) => i.prijs > 0) : [];
    // Geen prijzen (route nog niet live)? Dan na een paar minuten opnieuw proberen; met prijzen ververst het elk uur.
    if (items.length) cacheLife("hours");
    else cacheLife("minutes");
    return items;
  } catch {
    cacheLife("minutes");
    return [];
  }
}

export const euro = (n: number) => `€ ${n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const omschrijving = (p: Prijsvoorbeeld) =>
  `${t(p.naam)}, ${p.breedteMm} × ${p.hoogteMm} mm${p.glas ? `, ${t(p.glas === "triple" ? "triple glas (HR+++)" : "dubbel glas (HR++)")}` : ""}`;

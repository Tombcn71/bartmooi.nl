import { berekenChatPrijs } from "@/lib/chat-prijs";
import { berekenChatProduct } from "@/lib/chat-product";
import { KOZIJN_TYPEN } from "@/lib/kozijntypen";
import { ROOS_PRODUCTEN } from "@/lib/roos-producten";

// Voorbeeldprijzen voor bartmooi.nl, berekend met precies dezelfde prijsberekening als de calculator en de chat.
// Alleen lezen; de website haalt dit op, zodat er maar één bron voor prijzen is.
type Voorbeeld = { product: string; type: string; naam: string; breedteMm: number; hoogteMm: number; glas?: "dubbel" | "triple"; prijs: number; inclusief: string };

const KOZIJNEN = [
  { type: "vast-kozijn", b: 1000, h: 1000, glas: "dubbel" as const },
  { type: "draai-kiep-kozijn", b: 1000, h: 1200, glas: "dubbel" as const },
  { type: "draai-kiep-kozijn", b: 1000, h: 1200, glas: "triple" as const },
  { type: "draai-kiep-kozijn", b: 1500, h: 1400, glas: "dubbel" as const },
];
const ANDERE = [
  { product: "schuifpui", type: "schuifpui-2-vaks", b: 3000, h: 2200 },
  { product: "schuifpui", type: "schuifpui-4-vaks", b: 4000, h: 2200 },
  { product: "deur", type: "voordeur", b: 1000, h: 2100 },
  { product: "rolluik", type: "", b: 1200, h: 1400 },
  { product: "hor", type: "", b: 1000, h: 1200 },
];

const uitTekst = (t: string) => {
  const m = t.match(/totaal € ([\d.]+,\d{2})/);
  if (!m) return null;
  return { prijs: parseFloat(m[1].replace(/\./g, "").replace(",", ".")), inclusief: /inclusief montage en btw/.test(t) ? "montage en btw" : /inclusief btw/.test(t) ? "btw" : "" };
};

export async function GET() {
  const items: Voorbeeld[] = [];
  for (const k of KOZIJNEN) {
    const r = uitTekst(await berekenChatPrijs({ type: k.type, breedte_mm: k.b, hoogte_mm: k.h, glas: k.glas }));
    if (r) items.push({ product: "kozijn", type: k.type, naam: KOZIJN_TYPEN.find((t) => t.slug === k.type)?.naam ?? k.type, breedteMm: k.b, hoogteMm: k.h, glas: k.glas, ...r });
  }
  for (const a of ANDERE) {
    const typen = ROOS_PRODUCTEN[a.product]?.typen ?? {};
    const type = a.type || Object.keys(typen)[0];
    if (!type) continue;
    const r = uitTekst(await berekenChatProduct({ product: a.product, type, breedte_mm: a.b, hoogte_mm: a.h }));
    if (r) items.push({ product: a.product, type, naam: typen[type] ?? type, breedteMm: a.b, hoogteMm: a.h, ...r });
  }
  return Response.json({ valuta: "EUR", bijgewerkt: new Date().toISOString(), items }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}

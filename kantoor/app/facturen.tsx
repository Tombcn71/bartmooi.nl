"use client";
import { useEffect, useState } from "react";
import { Check, FileText, Printer, X } from "lucide-react";

/* ---------- ZZP-facturen: de app maakt ze zelf uit de goedgekeurde uren ---------- */
type Regel = { dag: number; klant: string; uren: number; notitie: string };
type Week = { regels: Regel[]; ingestuurd: boolean; goedgekeurd: boolean };
export type Bedrijf = { naam: string; telefoon: string; bedrijf?: string; kvk?: string; btw?: string; iban?: string; tarief?: number };

export const BART = { bedrijf: "BartMooi Kozijnen", adres: "Den Haag", kvk: "12345678", btw: "NL001234567B01" };
export const STANDAARD_TARIEF = 45;

export type Factuur = {
  id: string; nummer: string; naam: string; maandag: Date; week: number;
  regels: Regel[]; uren: number; tarief: number; totaal: number; lid?: Bedrijf;
};

const eur = (n: number) => n.toLocaleString("nl-NL", { style: "currency", currency: "EUR" });
const uurTekst = (u: number) => `${Math.floor(u)}:${String(Math.round((u % 1) * 60)).padStart(2, "0")}`;
const DAGEN = ["ma", "di", "wo", "do", "vr", "za", "zo"];

function maandagUitSleutel(s: string) {
  const d = new Date(s + "T12:00");
  if (d.getDay() === 0) d.setDate(d.getDate() + 1); // sleutel kan door tijdzone op zondag vallen
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}
function weeknummer(m: Date) {
  const d = new Date(Date.UTC(m.getFullYear(), m.getMonth(), m.getDate() + 3));
  const jan4 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  return 1 + Math.round((d.getTime() - jan4.getTime()) / 86400000 / 7 - ((jan4.getUTCDay() + 6) % 7 - 3) / 7);
}

export function maakFacturen(data: Record<string, Week>, leden: Bedrijf[]): Factuur[] {
  return Object.entries(data)
    .filter(([, w]) => w.goedgekeurd && w.regels.length)
    .map(([id, w]) => {
      const [naam, datum] = id.split("|");
      const maandag = maandagUitSleutel(datum);
      const week = weeknummer(maandag);
      const lid = leden.find((l) => l.naam === naam);
      const tarief = lid?.tarief ?? STANDAARD_TARIEF;
      const uren = w.regels.reduce((s, r) => s + r.uren, 0);
      return { id, naam, maandag, week, lid, tarief, uren, regels: w.regels, totaal: uren * tarief, nummer: `${maandag.getFullYear()}-W${String(week).padStart(2, "0")}-${naam.slice(0, 3).toUpperCase()}` };
    })
    .sort((a, b) => b.maandag.getTime() - a.maandag.getTime() || a.naam.localeCompare(b.naam));
}

function useBewaard<T>(sleutel: string, begin: T) {
  const [v, setV] = useState<T>(begin);
  useEffect(() => { try { const s = localStorage.getItem(sleutel); if (s) setV(JSON.parse(s)); } catch {} }, [sleutel]);
  const zet = (n: T) => { setV(n); try { localStorage.setItem(sleutel, JSON.stringify(n)); } catch {} };
  return [v, zet] as const;
}
// Voorbeeldprijzen voor de demo (zelfde namen als de demoprojecten).
const DEMO_PRIJS: Record<string, number> = { "Familie de Vries, Laan van Meerdervoort 12": 5500, "Familie Jansen, Zeestraat 31": 6000, "Van Dijk Bouw, Hoefkade 140": 9000 };
export const useProjectPrijs = () => useBewaard<Record<string, number>>("bm-gefactureerd", DEMO_PRIJS);
export const useBetaald = () => useBewaard<Record<string, boolean>>("bm-betaald", {});

/* ---------- de factuur zelf, ook als pdf (via afdrukken → opslaan als pdf) ---------- */
function factuurHtml(f: Factuur) {
  const l = f.lid;
  const rij = (r: Regel) => {
    const d = new Date(f.maandag); d.setDate(d.getDate() + r.dag);
    return `<tr><td>${DAGEN[r.dag]} ${d.getDate()}-${d.getMonth() + 1}</td><td>${r.klant}</td><td class="r">${uurTekst(r.uren)}</td><td class="r">${eur(r.uren * f.tarief)}</td></tr>`;
  };
  return `<!doctype html><html><head><meta charset="utf-8"><title>Factuur ${f.nummer}</title><style>
  body{font-family:system-ui,sans-serif;color:#0f172a;max-width:720px;margin:40px auto;padding:0 24px;font-size:14px}
  h1{color:#1E5079;margin:0 0 4px}table{width:100%;border-collapse:collapse;margin-top:24px}td,th{padding:8px 4px;border-bottom:1px solid #e2e8f0;text-align:left}.r{text-align:right}
  .kop{display:flex;justify-content:space-between;gap:24px;margin-top:24px}.tot td{font-weight:700;border:0}.mute{color:#64748b}
  </style></head><body>
  <h1>Factuur</h1><div class="mute">Nummer ${f.nummer} · week ${f.week} ${f.maandag.getFullYear()}</div>
  <div class="kop"><div><b>Van</b><br>${l?.bedrijf || f.naam}<br>KvK ${l?.kvk || "-"}<br>Btw ${l?.btw || "-"}<br>IBAN ${l?.iban || "-"}</div>
  <div><b>Aan</b><br>${BART.bedrijf}<br>${BART.adres}<br>KvK ${BART.kvk}<br>Btw ${BART.btw}</div></div>
  <table><tr><th>Dag</th><th>Project</th><th class="r">Uren</th><th class="r">Bedrag</th></tr>${f.regels.map(rij).join("")}
  <tr class="tot"><td></td><td>Totaal (${eur(f.tarief)} per uur)</td><td class="r">${uurTekst(f.uren)}</td><td class="r">${eur(f.totaal)}</td></tr></table>
  <p><b>Btw verlegd</b> — artikel 12 lid 5 Wet OB (onderaanneming).</p>
  <p class="mute">Gemaakt uit de door ${BART.bedrijf} goedgekeurde uren. Graag betalen binnen 14 dagen op ${l?.iban || "het bekende rekeningnummer"} o.v.v. ${f.nummer}.</p>
  <script>onload=()=>print()</script></body></html>`;
}
function openPdf(f: Factuur) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(factuurHtml(f));
  w.document.close();
}

function FactuurVenster({ f, sluit, pl }: { f: Factuur; sluit: () => void; pl?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center" onClick={sluit}>
      <div className="max-h-[92dvh] w-full max-w-lg space-y-3 overflow-y-auto rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div><h3 className="text-lg font-bold">{pl ? "Faktura" : "Factuur"} {f.nummer}</h3><p className="text-sm text-slate-500">{f.lid?.bedrijf || f.naam} → {BART.bedrijf} · week {f.week}</p></div>
          <button onClick={sluit} aria-label="Sluiten" className="p-1 text-slate-500"><X className="size-5" /></button>
        </div>
        <div className="divide-y divide-slate-100 text-sm">
          {f.regels.map((r, i) => (
            <div key={i} className="flex justify-between gap-3 py-2"><span><b>{DAGEN[r.dag]}</b> {r.klant.split(", ").slice(1).join(", ") || r.klant}</span><span className="shrink-0">{uurTekst(r.uren)} · {eur(r.uren * f.tarief)}</span></div>
          ))}
          <div className="flex justify-between py-2 font-bold"><span>{pl ? "Razem" : "Totaal"} ({eur(f.tarief)}/u)</span><span>{eur(f.totaal)}</span></div>
        </div>
        <p className="text-xs text-slate-500">Btw verlegd (onderaanneming).</p>
        <button onClick={() => openPdf(f)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E5079] p-3 font-bold text-white"><Printer className="size-4" /> {pl ? "Pobierz PDF" : "Download als PDF"}</button>
      </div>
    </div>
  );
}

/* ---------- monteur: zijn eigen facturen ---------- */
export function MijnFacturen({ naam, data, leden, pl }: { naam: string; data: Record<string, Week>; leden: Bedrijf[]; pl: boolean }) {
  const [betaald] = useBetaald();
  const [open, setOpen] = useState<Factuur | null>(null);
  const mijn = maakFacturen(data, leden).filter((f) => f.naam === naam);
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold">{pl ? "Moje faktury" : "Mijn facturen"}</h2>
      <p className="text-sm text-slate-500">{pl ? "Faktura tworzy się sama, gdy Bart zatwierdzi tydzień." : "Je factuur wordt vanzelf gemaakt zodra Bart je week goedkeurt."}</p>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {mijn.length === 0 && <p className="p-4 text-sm text-slate-500">{pl ? "Brak faktur." : "Nog geen facturen."}</p>}
        {mijn.map((f) => (
          <button key={f.id} onClick={() => setOpen(f)} className="flex w-full items-center gap-3 border-b border-slate-100 p-4 text-left last:border-0">
            <FileText className="size-5 shrink-0 text-[#1E5079]" />
            <span className="min-w-0 flex-1"><span className="block font-semibold">{pl ? "Tydzień" : "Week"} {f.week}</span><span className="text-sm text-slate-500">{f.nummer}</span></span>
            <span className="text-right"><span className="block font-bold">{eur(f.totaal)}</span>
              <span className={`text-xs font-semibold ${betaald[f.id] ? "text-green-700" : "text-amber-600"}`}>{betaald[f.id] ? (pl ? "Zapłacone" : "Betaald") : (pl ? "Niezapłacone" : "Nog niet betaald")}</span></span>
          </button>
        ))}
      </div>
      {open && <FactuurVenster f={open} pl={pl} sluit={() => setOpen(null)} />}
    </section>
  );
}

/* ---------- Bart: inkomende facturen en wat elk project oplevert ---------- */
export function FacturenKantoor({ data, leden, projecten }: { data: Record<string, Week>; leden: Bedrijf[]; projecten: string[] }) {
  const [betaald, zetBetaald] = useBetaald();
  const [klant, zetKlant] = useProjectPrijs();
  const [deel, setDeel] = useState<"in" | "project">("in");
  const [open, setOpen] = useState<Factuur | null>(null);
  const alle = maakFacturen(data, leden);
  const weken = [...new Set(alle.map((f) => f.maandag.getTime()))];
  const openstaand = alle.filter((f) => !betaald[f.id]).reduce((s, f) => s + f.totaal, 0);

  const perProject = [...new Set([...projecten, ...alle.flatMap((f) => f.regels.map((r) => r.klant))])].map((p) => {
    let uren = 0, kosten = 0;
    for (const f of alle) for (const r of f.regels) if (r.klant === p) { uren += r.uren; kosten += r.uren * f.tarief; }
    return { p, uren, kosten };
  });

  return (
    <main className="mx-auto max-w-4xl space-y-4 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Facturen</h1>
        <div className="flex rounded-xl bg-slate-200/70 p-1 text-sm font-semibold">
          {([["in", "Betalen aan monteurs"], ["project", "Factureren aan opdrachtgevers"]] as const).map(([k, t]) => (
            <button key={k} onClick={() => setDeel(k)} className={`rounded-lg px-3 py-1.5 ${deel === k ? "bg-white text-[#1E5079] shadow-sm" : "text-slate-600"}`}>{t}</button>
          ))}
        </div>
      </div>

      {deel === "in" ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Moet je nog betalen aan monteurs</p><p className="text-2xl font-bold text-[#1E5079]">{eur(openstaand)}</p></div>
            <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Facturen van monteurs open</p><p className="text-2xl font-bold">{alle.filter((f) => !betaald[f.id]).length}</p></div>
          </div>
          {alle.length === 0 && <p className="rounded-2xl bg-white p-4 text-slate-500 shadow-sm">Nog geen facturen. Ze komen vanzelf zodra je bij Uren een week goedkeurt.</p>}
          {weken.map((t) => {
            const fs = alle.filter((f) => f.maandag.getTime() === t);
            return (
              <section key={t} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <h2 className="flex justify-between border-b border-slate-100 p-4 font-bold"><span>Week {fs[0].week}</span><span>{eur(fs.reduce((s, f) => s + f.totaal, 0))}</span></h2>
                {fs.map((f) => (
                  <div key={f.id} className="flex items-center gap-3 border-b border-slate-100 p-4 last:border-0">
                    <button onClick={() => setOpen(f)} className="min-w-0 flex-1 text-left">
                      <span className="block font-semibold">{f.lid?.bedrijf || f.naam}</span>
                      <span className="text-sm text-slate-500">{f.naam} · {uurTekst(f.uren)} uur · {f.nummer}</span>
                    </button>
                    <span className="font-bold">{eur(f.totaal)}</span>
                    <button onClick={() => zetBetaald({ ...betaald, [f.id]: !betaald[f.id] })} className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold ${betaald[f.id] ? "bg-green-100 text-green-800" : "border border-slate-300 text-slate-700"}`}>
                      {betaald[f.id] ? <><Check className="size-3.5" /> Betaald</> : "Betalen"}
                    </button>
                  </div>
                ))}
              </section>
            );
          })}
        </>
      ) : (
        <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Factureer je aan opdrachtgevers</p><p className="text-2xl font-bold text-[#1E5079]">{eur(perProject.reduce((s, x) => s + (klant[x.p] ?? 0), 0))}</p></div>
          <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Kost je aan monteurs</p><p className="text-2xl font-bold">{eur(perProject.reduce((s, x) => s + x.kosten, 0))}</p></div>
          <div className="rounded-2xl bg-white p-4 shadow-sm"><p className="text-sm text-slate-500">Houd je over</p><p className="text-2xl font-bold text-green-700">{eur(perProject.reduce((s, x) => s + (klant[x.p] ?? 0) - x.kosten, 0))}</p></div>
        </div>
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead><tr className="border-b border-slate-200 text-left text-xs text-slate-500"><th className="p-3">Project / opdrachtgever</th><th className="p-3 text-right">Uren</th><th className="p-3 text-right">Factureer je</th><th className="p-3 text-right">Betaal je monteurs</th><th className="p-3 text-right">Houd je over</th></tr></thead>
            <tbody>
              {perProject.map(({ p, uren, kosten }) => {
                const g = klant[p] ?? 0;
                const over = g - kosten;
                return (
                  <tr key={p} className="border-b border-slate-100 last:border-0">
                    <td className="p-3"><span className="block font-semibold">{p.split(", ").slice(1).join(", ") || p}</span><span className="text-xs text-slate-500">{p.split(", ")[0]}</span></td>
                    <td className="p-3 text-right">{uurTekst(uren)}</td>
                    <td className="p-3 text-right">
                      <span className="inline-flex items-center gap-1">€<input inputMode="numeric" value={g || ""} placeholder="0" onChange={(e) => zetKlant({ ...klant, [p]: parseInt(e.target.value.replace(/\D/g, "") || "0", 10) })} className="w-24 rounded-lg border border-slate-300 px-2 py-1 text-right" /></span>
                    </td>
                    <td className="p-3 text-right">{eur(kosten)}</td>
                    <td className={`p-3 text-right font-bold ${g === 0 ? "text-slate-400" : over >= 0 ? "text-green-700" : "text-red-600"}`}>{g === 0 ? "–" : eur(over)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="border-t border-slate-100 p-3 text-xs text-slate-500">Factureer je = de prijs die je de opdrachtgever rekent (in te stellen bij Projecten). Betaal je monteurs = goedgekeurde uren × hun uurloon.</p>
        </div>
        </div>
      )}
      {open && <FactuurVenster f={open} sluit={() => setOpen(null)} />}
    </main>
  );
}

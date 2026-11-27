"use client";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download, HardHat, Minus, Plus, Send, UserCog } from "lucide-react";

/*
 * Voorbeeld van de werkbonnen-app voor BartMooi: twee schermen.
 * - Monteur: per dag bij welke klant en hoeveel uur, en aan het eind "week insturen". Geen inklokken.
 * - Bart: per week per monteur de uren, goedkeuren en downloaden.
 * Alles is voorbeelddata en wordt alleen in deze browser bewaard.
 */

type Taal = "nl" | "pl";
type Regel = { dag: number; klant: string; uren: number; notitie: string };
type Week = { regels: Regel[]; ingestuurd: boolean; goedgekeurd: boolean };

const MONTEURS = ["Piotr", "Marek", "Tomasz"];
const KLANTEN = ["Familie de Vries, Laan van Meerdervoort 12", "Familie Jansen, Zeestraat 31", "Van Dijk Bouw, Hoefkade 140"];

const T = {
  nl: {
    wie: "Wie ben jij?", monteur: "Monteur", bart: "Bart (kantoor)", week: "Week", dagen: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    toevoegen: "Klant toevoegen", klant: "Klant", uur: "uur", notitie: "Wat heb je gedaan? (mag leeg)", totaal: "Totaal deze week", insturen: "Week insturen",
    ingestuurd: "Ingestuurd. Bart ziet je uren nu.", goedgekeurd: "Goedgekeurd door Bart", wissel: "Andere persoon", geen: "Nog niets ingevuld",
  },
  pl: {
    wie: "Kim jesteś?", monteur: "Monter", bart: "Bart (biuro)", week: "Tydzień", dagen: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
    toevoegen: "Dodaj klienta", klant: "Klient", uur: "godz.", notitie: "Co zrobiłeś? (opcjonalnie)", totaal: "Razem w tym tygodniu", insturen: "Wyślij tydzień",
    ingestuurd: "Wysłano. Bart widzi teraz twoje godziny.", goedgekeurd: "Zatwierdzone przez Barta", wissel: "Inna osoba", geen: "Nic jeszcze nie wpisano",
  },
};

/* ---------- weken ---------- */
function maandagVan(d: Date) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}
function weeknummer(maandag: Date) {
  const d = new Date(Date.UTC(maandag.getFullYear(), maandag.getMonth(), maandag.getDate() + 3));
  const jan4 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  return 1 + Math.round((d.getTime() - jan4.getTime()) / 86400000 / 7 - ((jan4.getUTCDay() + 6) % 7 - 3) / 7);
}
const sleutel = (monteur: string, maandag: Date) => `${monteur}|${maandag.toISOString().slice(0, 10)}`;
const datumKort = (d: Date, taal: Taal) => d.toLocaleDateString(taal === "pl" ? "pl-PL" : "nl-NL", { day: "numeric", month: "short" });

/* ---------- opslag (alleen in deze browser) ---------- */
function useOpslag() {
  const [data, setData] = useState<Record<string, Week>>({});
  useEffect(() => {
    try {
      const s = localStorage.getItem("bm-werkbonnen");
      if (s) setData(JSON.parse(s));
      else {
        // Een paar voorbeelduren, zodat Barts scherm niet leeg is.
        const m = maandagVan(new Date());
        setData({
          [sleutel("Piotr", m)]: { ingestuurd: true, goedgekeurd: false, regels: [0, 1, 2].map((dag) => ({ dag, klant: KLANTEN[0], uren: 8, notitie: dag === 0 ? "Oude kozijnen eruit" : "" })).concat([{ dag: 3, klant: KLANTEN[1], uren: 6, notitie: "Rolluiken" }]) },
          [sleutel("Marek", m)]: { ingestuurd: false, goedgekeurd: false, regels: [{ dag: 0, klant: KLANTEN[2], uren: 7.5, notitie: "" }] },
        });
      }
    } catch {}
  }, []);
  const bewaar = (k: string, w: Week) =>
    setData((d) => {
      const n = { ...d, [k]: w };
      try { localStorage.setItem("bm-werkbonnen", JSON.stringify(n)); } catch {}
      return n;
    });
  return { data, bewaar };
}

export default function Start() {
  const [rol, setRol] = useState<null | { soort: "monteur"; naam: string } | { soort: "bart" }>(null);
  const [taal, setTaal] = useState<Taal>("nl");
  const opslag = useOpslag();
  const t = T[taal];

  if (!rol)
    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 p-6">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t.wie}</h1>
          <TaalKnop taal={taal} setTaal={setTaal} />
        </div>
        {MONTEURS.map((m) => (
          <button key={m} onClick={() => setRol({ soort: "monteur", naam: m })} className="flex items-center gap-3 rounded-2xl bg-white p-5 text-left text-lg font-semibold shadow-sm active:scale-[.99]">
            <HardHat className="size-6 text-[#1E5079]" /> {m} <span className="ml-auto text-sm font-normal text-slate-500">{t.monteur}</span>
          </button>
        ))}
        <button onClick={() => setRol({ soort: "bart" })} className="mt-4 flex items-center gap-3 rounded-2xl bg-[#1E5079] p-5 text-left text-lg font-semibold text-white shadow-sm">
          <UserCog className="size-6" /> {t.bart}
        </button>
        <p className="mt-6 text-center text-xs text-slate-500">Voorbeeld: straks logt iedereen in met een eigen wachtwoord.</p>
      </main>
    );

  return rol.soort === "monteur" ? (
    <Monteur naam={rol.naam} taal={taal} setTaal={setTaal} terug={() => setRol(null)} {...opslag} />
  ) : (
    <Bart terug={() => setRol(null)} {...opslag} />
  );
}

function TaalKnop({ taal, setTaal }: { taal: Taal; setTaal: (t: Taal) => void }) {
  return (
    <div className="flex rounded-full bg-slate-200 p-0.5 text-sm font-bold">
      {(["nl", "pl"] as const).map((x) => (
        <button key={x} onClick={() => setTaal(x)} className={`rounded-full px-3 py-1 uppercase ${taal === x ? "bg-white shadow-sm" : "text-slate-600"}`}>{x}</button>
      ))}
    </div>
  );
}

function WeekKiezer({ maandag, setMaandag, label, taal }: { maandag: Date; setMaandag: (d: Date) => void; label: string; taal: Taal }) {
  const zondag = new Date(maandag); zondag.setDate(zondag.getDate() + 6);
  const schuif = (n: number) => { const d = new Date(maandag); d.setDate(d.getDate() + 7 * n); setMaandag(d); };
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-2 shadow-sm">
      <button onClick={() => schuif(-1)} className="grid size-10 place-items-center rounded-full hover:bg-slate-100" aria-label="Vorige week"><ChevronLeft /></button>
      <div className="text-center"><div className="font-bold">{label} {weeknummer(maandag)}</div><div className="text-xs text-slate-500">{datumKort(maandag, taal)} – {datumKort(zondag, taal)}</div></div>
      <button onClick={() => schuif(1)} className="grid size-10 place-items-center rounded-full hover:bg-slate-100" aria-label="Volgende week"><ChevronRight /></button>
    </div>
  );
}

/* ---------- monteur: één scherm, de week ---------- */
function Monteur({ naam, taal, setTaal, terug, data, bewaar }: { naam: string; taal: Taal; setTaal: (t: Taal) => void; terug: () => void } & ReturnType<typeof useOpslag>) {
  const t = T[taal];
  const [maandag, setMaandag] = useState(() => maandagVan(new Date()));
  const k = sleutel(naam, maandag);
  const week: Week = data[k] ?? { regels: [], ingestuurd: false, goedgekeurd: false };
  const zet = (regels: Regel[]) => bewaar(k, { ...week, regels, ingestuurd: false });
  const totaal = week.regels.reduce((s, r) => s + r.uren, 0);
  const vast = week.goedgekeurd;

  return (
    <main className="mx-auto max-w-md space-y-3 p-4 pb-28">
      <div className="flex items-center justify-between">
        <button onClick={terug} className="text-sm text-slate-600">← {t.wissel}</button>
        <TaalKnop taal={taal} setTaal={setTaal} />
      </div>
      <h1 className="text-2xl font-bold">{naam}</h1>
      <WeekKiezer maandag={maandag} setMaandag={setMaandag} label={t.week} taal={taal} />

      {t.dagen.map((dagNaam, dag) => {
        const datum = new Date(maandag); datum.setDate(datum.getDate() + dag);
        const regels = week.regels.map((r, i) => ({ r, i })).filter(({ r }) => r.dag === dag);
        return (
          <section key={dag} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-baseline justify-between">
              <h2 className="font-bold">{dagNaam}</h2>
              <span className="text-sm text-slate-500">{datumKort(datum, taal)}</span>
            </div>
            {regels.map(({ r, i }) => (
              <div key={i} className="mb-3 space-y-2 border-b border-slate-100 pb-3 last:border-0">
                <select disabled={vast} value={r.klant} onChange={(e) => zet(week.regels.map((x, j) => (j === i ? { ...x, klant: e.target.value } : x)))} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-base">
                  {KLANTEN.map((kl) => <option key={kl}>{kl}</option>)}
                </select>
                <div className="flex items-center gap-2">
                  <button disabled={vast} onClick={() => zet(week.regels.map((x, j) => (j === i ? { ...x, uren: Math.max(0, x.uren - 0.5) } : x)))} className="grid size-11 place-items-center rounded-xl border border-slate-300"><Minus className="size-5" /></button>
                  <span className="w-20 text-center text-xl font-bold">{r.uren} <span className="text-sm font-normal">{t.uur}</span></span>
                  <button disabled={vast} onClick={() => zet(week.regels.map((x, j) => (j === i ? { ...x, uren: Math.min(14, x.uren + 0.5) } : x)))} className="grid size-11 place-items-center rounded-xl border border-slate-300"><Plus className="size-5" /></button>
                  {!vast && <button onClick={() => zet(week.regels.filter((_, j) => j !== i))} className="ml-auto text-sm text-red-600">✕</button>}
                </div>
                <input disabled={vast} value={r.notitie} onChange={(e) => zet(week.regels.map((x, j) => (j === i ? { ...x, notitie: e.target.value } : x)))} placeholder={t.notitie} className="w-full rounded-xl border border-slate-200 p-3 text-base" />
              </div>
            ))}
            {!vast && (
              <button onClick={() => zet([...week.regels, { dag, klant: regels.at(-1)?.r.klant ?? KLANTEN[0], uren: 8, notitie: "" }])} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-3 text-sm font-semibold text-slate-600">
                <Plus className="size-4" /> {t.toevoegen}
              </button>
            )}
          </section>
        );
      })}

      <div className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white p-4">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <div><div className="text-xs text-slate-500">{t.totaal}</div><div className="text-xl font-bold">{totaal} {t.uur}</div></div>
          {week.goedgekeurd ? (
            <span className="ml-auto flex items-center gap-1 font-semibold text-green-700"><Check className="size-5" /> {t.goedgekeurd}</span>
          ) : week.ingestuurd ? (
            <span className="ml-auto text-right text-sm font-semibold text-green-700">{t.ingestuurd}</span>
          ) : (
            <button disabled={totaal === 0} onClick={() => bewaar(k, { ...week, ingestuurd: true })} className="ml-auto flex items-center gap-2 rounded-xl bg-[#1E5079] px-5 py-3 font-bold text-white disabled:opacity-40">
              <Send className="size-4" /> {t.insturen}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

/* ---------- Bart: de week van alle monteurs ---------- */
function Bart({ terug, data, bewaar }: { terug: () => void } & ReturnType<typeof useOpslag>) {
  const [maandag, setMaandag] = useState(() => maandagVan(new Date()));
  const dagen = T.nl.dagen.map((d) => d.slice(0, 2));
  const rijen = useMemo(() => MONTEURS.map((m) => ({ m, k: sleutel(m, maandag), w: data[sleutel(m, maandag)] })), [data, maandag]);

  function download() {
    const kop = ["Monteur", "Dag", "Klant", "Uren", "Notitie", "Status"];
    const regels = rijen.flatMap(({ m, w }) => (w?.regels ?? []).map((r) => [m, T.nl.dagen[r.dag], r.klant, String(r.uren).replace(".", ","), r.notitie, w!.goedgekeurd ? "goedgekeurd" : w!.ingestuurd ? "ingestuurd" : "concept"]));
    const csv = [kop, ...regels].map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(";")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
    a.download = `uren-week-${weeknummer(maandag)}.csv`;
    a.click();
  }

  return (
    <main className="mx-auto max-w-5xl space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <button onClick={terug} className="text-sm text-slate-600">← Andere persoon</button>
        <button onClick={download} className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold"><Download className="size-4" /> Download (Excel)</button>
      </div>
      <h1 className="text-2xl font-bold">Uren van de monteurs</h1>
      <div className="max-w-sm"><WeekKiezer maandag={maandag} setMaandag={setMaandag} label="Week" taal="nl" /></div>

      {rijen.map(({ m, k, w }) => {
        const perDag = dagen.map((_, d) => (w?.regels ?? []).filter((r) => r.dag === d).reduce((s, r) => s + r.uren, 0));
        const totaal = perDag.reduce((a, b) => a + b, 0);
        return (
          <section key={m} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-bold">{m}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${w?.goedgekeurd ? "bg-green-100 text-green-800" : w?.ingestuurd ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}>
                {w?.goedgekeurd ? "Goedgekeurd" : w?.ingestuurd ? "Ingestuurd, wacht op jou" : totaal ? "Nog niet ingestuurd" : "Niets ingevuld"}
              </span>
              <span className="ml-auto text-lg font-bold">{totaal} uur</span>
              {w?.ingestuurd && !w.goedgekeurd && (
                <button onClick={() => bewaar(k, { ...w, goedgekeurd: true })} className="flex items-center gap-1 rounded-xl bg-green-700 px-4 py-2 text-sm font-bold text-white"><Check className="size-4" /> Goedkeuren</button>
              )}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-sm">
              {dagen.map((d, i) => (
                <div key={d} className="rounded-lg bg-slate-50 p-2"><div className="text-xs text-slate-500">{d}</div><div className="font-semibold">{perDag[i] || "–"}</div></div>
              ))}
            </div>
            {(w?.regels.length ?? 0) > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {w!.regels.slice().sort((a, b) => a.dag - b.dag).map((r, i) => (
                  <li key={i}><span className="font-semibold">{T.nl.dagen[r.dag]}</span> · {r.klant} · {r.uren} uur{r.notitie ? ` · ${r.notitie}` : ""}</li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </main>
  );
}

"use client";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Download, HardHat, Plus, Send, UserCog } from "lucide-react";

/*
 * Voorbeeld van de werkbonnen-app voor BartMooi: twee schermen.
 * - Monteur: per dag bij welke klant en hoeveel uur, en aan het eind "week insturen". Geen inklokken.
 * - Bart: per week per monteur de uren, goedkeuren en downloaden.
 * Alles is voorbeelddata en wordt alleen in deze browser bewaard.
 */

type Taal = "nl" | "pl";
type Regel = { dag: number; klant: string; uren: number; notitie: string };
type Week = { regels: Regel[]; ingestuurd: boolean; goedgekeurd: boolean };

const MONTEURS = ["Piotr", "Marek", "Tomasz", "Kamil", "Paweł"];
const KLANTEN = ["Familie de Vries, Laan van Meerdervoort 12", "Familie Jansen, Zeestraat 31", "Van Dijk Bouw, Hoefkade 140"];

const T = {
  nl: {
    wie: "Wie ben jij?", monteur: "Monteur", bart: "Bart (kantoor)", week: "Week", dagen: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    toevoegen: "Klant toevoegen", klant: "Klant", uur: "uur", min: "min", notitie: "Wat heb je gedaan? (mag leeg)", totaal: "Totaal deze week", insturen: "Week insturen",
    ingestuurd: "Ingestuurd. Bart ziet je uren nu.", goedgekeurd: "Goedgekeurd door Bart", wissel: "Andere persoon", geen: "Nog niets ingevuld",
  },
  pl: {
    wie: "Kim jesteś?", monteur: "Monter", bart: "Bart (biuro)", week: "Tydzień", dagen: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
    toevoegen: "Dodaj klienta", klant: "Klient", uur: "godz.", min: "min", notitie: "Co zrobiłeś? (opcjonalnie)", totaal: "Razem w tym tygodniu", insturen: "Wyślij tydzień",
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
/** 7,5 → "7:30" */
const uurTekst = (u: number) => `${Math.floor(u)}:${String(Math.round((u % 1) * 60)).padStart(2, "0")}`;
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

  if (!rol) return <Inloggen taal={taal} setTaal={setTaal} kies={setRol} />;

  return rol.soort === "monteur" ? (
    <Monteur naam={rol.naam} taal={taal} setTaal={setTaal} terug={() => setRol(null)} {...opslag} />
  ) : (
    <Bart terug={() => setRol(null)} {...opslag} />
  );
}

/* ---------- inloggen: eerst monteur of kantoor, dan je gegevens ---------- */
const MONTEUR_TEL: Record<string, string> = { "0611111111": "Piotr", "0622222222": "Marek", "0633333333": "Tomasz" };
function Inloggen({ taal, setTaal, kies }: { taal: Taal; setTaal: (t: Taal) => void; kies: (r: { soort: "monteur"; naam: string } | { soort: "bart" }) => void }) {
  const [wie, setWie] = useState<null | "monteur" | "kantoor">(null);
  const [tel, setTel] = useState("");
  const [code, setCode] = useState("");
  const [fout, setFout] = useState("");
  const L = taal === "pl"
    ? { titel: "Godziny pracy", monteur: "Jestem monterem", kantoor: "Biuro", tel: "Twój numer telefonu", pin: "Kod PIN (4 cyfry)", in: "Zaloguj się", terug: "Wstecz", fout: "Nieprawidłowy numer lub kod." }
    : { titel: "Werkbonnen", monteur: "Ik ben monteur", kantoor: "Kantoor", tel: "Je telefoonnummer", pin: "Pincode (4 cijfers)", in: "Inloggen", terug: "Terug", fout: "Nummer of pincode klopt niet." };
  const veld = "w-full rounded-xl border border-slate-300 bg-white p-4 text-lg";
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{L.titel}</h1>
        <TaalKnop taal={taal} setTaal={setTaal} />
      </div>
      {!wie && (
        <>
          <button onClick={() => kies({ soort: "monteur", naam: "Piotr" })} className="flex items-center justify-center gap-3 rounded-2xl bg-[#1E5079] p-6 text-xl font-bold text-white shadow-sm"><HardHat className="size-7" /> {L.monteur}</button>
          <button onClick={() => kies({ soort: "bart" })} className="flex items-center justify-center gap-3 rounded-2xl bg-white p-6 text-xl font-bold shadow-sm"><UserCog className="size-7 text-[#1E5079]" /> {L.kantoor}</button>
        </>
      )}
      {wie && (
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (wie === "kantoor") return code.length > 0 ? kies({ soort: "bart" }) : setFout(L.fout);
            const naam = MONTEUR_TEL[tel.replace(/\D/g, "")];
            if (naam && code.length === 4) kies({ soort: "monteur", naam });
            else setFout(L.fout);
          }}>
          <p className="text-lg font-semibold">{wie === "monteur" ? L.monteur : L.kantoor}</p>
          {wie === "monteur" && <input inputMode="tel" autoComplete="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder={L.tel} className={veld} />}
          <input inputMode={wie === "monteur" ? "numeric" : undefined} type="password" value={code} onChange={(e) => setCode(e.target.value)} placeholder={wie === "monteur" ? L.pin : "Wachtwoord"} maxLength={wie === "monteur" ? 4 : undefined} className={veld} />
          {fout && <p className="text-sm text-red-600">{fout}</p>}
          <button className="w-full rounded-xl bg-[#1E5079] p-4 text-lg font-bold text-white">{L.in}</button>
          <button type="button" onClick={() => { setWie(null); setFout(""); setCode(""); }} className="w-full p-2 text-slate-600">← {L.terug}</button>
          <p className="pt-4 text-center text-xs text-slate-500">Voorbeeld: monteur Piotr = 0611111111, Marek = 0622222222, Tomasz = 0633333333, elke pincode van 4 cijfers. Kantoor: elk wachtwoord.</p>
        </form>
      )}
    </main>
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
                  <label className="flex items-center gap-2">
                    <input disabled={vast} inputMode="numeric" value={Math.floor(r.uren) || ""} placeholder="0"
                      onChange={(e) => { const h = Math.min(16, Math.max(0, parseInt(e.target.value.replace(/\D/g, "") || "0", 10))); zet(week.regels.map((x, j) => (j === i ? { ...x, uren: h + (x.uren % 1) } : x))); }}
                      className="w-16 rounded-xl border border-slate-300 p-3 text-center text-xl font-bold" />
                    <span className="text-sm text-slate-600">{t.uur}</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <select disabled={vast} value={Math.round((r.uren % 1) * 60)}
                      onChange={(e) => zet(week.regels.map((x, j) => (j === i ? { ...x, uren: Math.floor(x.uren) + Number(e.target.value) / 60 } : x)))}
                      className="rounded-xl border border-slate-300 bg-white p-3 text-xl font-bold">
                      {[0, 15, 30, 45].map((m) => <option key={m} value={m}>{String(m).padStart(2, "0")}</option>)}
                    </select>
                    <span className="text-sm text-slate-600">{t.min}</span>
                  </label>
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
          <div><div className="text-xs text-slate-500">{t.totaal}</div><div className="text-xl font-bold">{uurTekst(totaal)}</div></div>
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

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="grid grid-cols-[1fr_repeat(7,2.2rem)_3.5rem] items-center gap-1 border-b border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 md:grid-cols-[1fr_repeat(7,3rem)_4rem_9rem]">
          <span>Monteur</span>{dagen.map((d) => <span key={d} className="text-center">{d}</span>)}<span className="text-right">Totaal</span><span className="hidden md:block" />
        </div>
        {rijen.map(({ m, k, w }) => {
          const perDag = dagen.map((_, d) => (w?.regels ?? []).filter((r) => r.dag === d).reduce((s, r) => s + r.uren, 0));
          const totaal = perDag.reduce((a, b) => a + b, 0);
          const status = w?.goedgekeurd ? ["Goedgekeurd", "bg-green-100 text-green-800"] : w?.ingestuurd ? ["Ingestuurd", "bg-amber-100 text-amber-800"] : totaal ? ["Bezig", "bg-slate-100 text-slate-600"] : ["Leeg", "bg-slate-50 text-slate-400"];
          return (
            <details key={m} className="border-b border-slate-100 last:border-0">
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_repeat(7,2.2rem)_3.5rem] items-center gap-1 px-3 py-3 text-sm hover:bg-slate-50 md:grid-cols-[1fr_repeat(7,3rem)_4rem_9rem] [&::-webkit-details-marker]:hidden">
                <span className="truncate font-semibold">{m} <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold md:hidden ${status[1]}`}>{status[0]}</span></span>
                {perDag.map((u, i) => <span key={i} className="text-center tabular-nums text-slate-700">{u ? uurTekst(u) : "–"}</span>)}
                <span className="text-right font-bold tabular-nums">{uurTekst(totaal)}</span>
                <span className="hidden justify-end md:flex">
                  {w?.ingestuurd && !w.goedgekeurd
                    ? <button onClick={(e) => { e.preventDefault(); bewaar(k, { ...w, goedgekeurd: true }); }} className="flex items-center gap-1 rounded-lg bg-green-700 px-3 py-1 text-xs font-bold text-white"><Check className="size-3.5" /> Goedkeuren</button>
                    : <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${status[1]}`}>{status[0]}</span>}
                </span>
              </summary>
              <div className="space-y-1 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {(w?.regels.length ?? 0) === 0 ? <p className="text-slate-500">Nog niets ingevuld.</p> : w!.regels.slice().sort((a, b) => a.dag - b.dag).map((r, i) => (
                  <p key={i}><span className="font-semibold">{T.nl.dagen[r.dag]}</span> · {r.klant} · {uurTekst(r.uren)}{r.notitie ? ` · ${r.notitie}` : ""}</p>
                ))}
                {w?.ingestuurd && !w.goedgekeurd && <button onClick={() => bewaar(k, { ...w, goedgekeurd: true })} className="mt-2 flex items-center gap-1 rounded-lg bg-green-700 px-4 py-2 text-sm font-bold text-white md:hidden"><Check className="size-4" /> Goedkeuren</button>}
              </div>
            </details>
          );
        })}
      </div>
      <p className="text-xs text-slate-500">Tik op een monteur voor de details per dag.</p>
    </main>
  );
}

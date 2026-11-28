"use client";
import { useEffect, useMemo, useState } from "react";
import { MijnCertificaten, CertificatenKantoor } from "./certificaten";
import { FacturenKantoor, MijnFacturen, STANDAARD_TARIEF, useProjectPrijs } from "./facturen";
import { Check, ChevronLeft, ChevronRight, HardHat, Home, MapPin, X, Plus, Send, UserCog } from "lucide-react";

/*
 * Voorbeeld van de werkbonnen-app voor BartMooi: twee schermen.
 * - Monteur: per dag bij welke klant en hoeveel uur, en aan het eind "week insturen". Geen inklokken.
 * - Bart: per week per monteur de uren en goedkeuren. Geen Excel nodig.
 * Alles is voorbeelddata en wordt alleen in deze browser bewaard.
 */

type Taal = "nl" | "pl";
type Regel = { dag: number; klant: string; uren: number; notitie: string };
type Week = { regels: Regel[]; ingestuurd: boolean; goedgekeurd: boolean };

/* ---------- het team van Bart: wie er werken (Bart stelt dit zelf in) ---------- */
type Lid = { naam: string; telefoon: string; pin?: string; taal?: Taal; bedrijf?: string; kvk?: string; btw?: string; iban?: string; tarief?: number };
const STANDAARD_TEAM: Lid[] = [
  { naam: "Piotr", telefoon: "06 1111 1111", bedrijf: "PN Montage", kvk: "81234567", btw: "NL862345678B01", iban: "NL12 INGB 0001 2345 67", tarief: 45 },
  { naam: "Marek", telefoon: "06 2222 2222", bedrijf: "Marek Bouw", kvk: "82345678", btw: "NL863456789B01", iban: "NL34 RABO 0123 4567 89", tarief: 42.5 },
  { naam: "Tomasz", telefoon: "06 3333 3333", bedrijf: "TK Kozijnwerk", kvk: "83456789", btw: "NL864567890B01", iban: "NL56 ABNA 0234 5678 90", tarief: 45 },
  { naam: "Kamil", telefoon: "06 4444 4444", bedrijf: "Kamil Klusbedrijf", kvk: "84567890", btw: "NL865678901B01", iban: "NL78 INGB 0003 4567 89", tarief: 40 },
  { naam: "Paweł", telefoon: "06 5555 5555", bedrijf: "PW Afbouw", kvk: "85678901", btw: "NL866789012B01", iban: "NL90 BUNQ 2045 6789 01", tarief: 42.5 },
];
let teamNu: Lid[] = STANDAARD_TEAM;
const luisteraars = new Set<() => void>();
function laadTeam() {
  try { const t = localStorage.getItem("bm-team"); if (t) teamNu = JSON.parse(t); } catch {}
}
function zetTeam(t: Lid[]) {
  teamNu = t;
  try { localStorage.setItem("bm-team", JSON.stringify(t)); } catch {}
  luisteraars.forEach((f) => f());
}
function useTeam() {
  const [, ververs] = useState(0);
  useEffect(() => {
    laadTeam();
    const f = () => ververs((n) => n + 1);
    luisteraars.add(f);
    f();
    return () => { luisteraars.delete(f); };
  }, []);
  return { leden: teamNu, team: teamNu.map((l) => l.naam), zetTeam };
}
const KLANTEN = ["Familie de Vries, Laan van Meerdervoort 12", "Familie Jansen, Zeestraat 31", "Van Dijk Bouw, Hoefkade 140"];

/* ---------- projecten: Bart stelt zelf in waar gewerkt wordt ---------- */
let projectenNu: string[] = KLANTEN;
let infoNu: Record<string, string> = {
  [KLANTEN[0]]: "Kozijnen vervangen: 4 kunststof kozijnen achterkant, oude eruit en afvoeren.",
  [KLANTEN[1]]: "Rolluiken: 3 elektrische rolluiken aan de voorkant.",
  [KLANTEN[2]]: "Nieuwbouw: inmeten en plaatsen van 6 aluminium ramen.",
};
type Periode = { start: string; eind: string };
let periodeNu: Record<string, Periode> = {};
function zetPeriode(i: Record<string, Periode>) {
  periodeNu = i;
  try { localStorage.setItem("bm-project-periode", JSON.stringify(i)); } catch {}
  projLuisteraars.forEach((f) => f());
}
function isoDag(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; }
function datumNL(iso: string) { return iso ? new Date(iso + "T12:00").toLocaleDateString("nl-NL", { day: "numeric", month: "short" }) : ""; }
function periodeTekst(p?: Periode) { if (!p || (!p.start && !p.eind)) return ""; return `${datumNL(p.start) || "?"} – ${datumNL(p.eind) || "?"}`; }
function zetInfo(i: Record<string, string>) {
  infoNu = i;
  try { localStorage.setItem("bm-project-info", JSON.stringify(i)); } catch {}
  projLuisteraars.forEach((f) => f());
}
const projLuisteraars = new Set<() => void>();
function zetProjecten(p: string[]) {
  projectenNu = p;
  try { localStorage.setItem("bm-projecten", JSON.stringify(p)); } catch {}
  projLuisteraars.forEach((f) => f());
}
function useProjecten() {
  const [, ververs] = useState(0);
  useEffect(() => {
    try { const t = localStorage.getItem("bm-projecten"); if (t) projectenNu = JSON.parse(t); const i = localStorage.getItem("bm-project-info"); if (i) infoNu = JSON.parse(i); const pe = localStorage.getItem("bm-project-periode"); if (pe) periodeNu = JSON.parse(pe); else { const m = new Date(); m.setDate(m.getDate() - ((m.getDay() + 6) % 7)); const plus = (n: number) => { const d = new Date(m); d.setDate(d.getDate() + n); return isoDag(d); }; periodeNu = { [KLANTEN[0]]: { start: plus(-7), eind: plus(11) }, [KLANTEN[1]]: { start: plus(0), eind: plus(1) }, [KLANTEN[2]]: { start: plus(2), eind: plus(25) } }; } } catch {}
    const f = () => ververs((n) => n + 1);
    projLuisteraars.add(f);
    f();
    return () => { projLuisteraars.delete(f); };
  }, []);
  return { projecten: projectenNu, zetProjecten, info: infoNu, zetInfo, periode: periodeNu, zetPeriode };
}

const T = {
  nl: {
    wie: "Wie ben jij?", monteur: "Monteur", bart: "Bart (kantoor)", week: "Week", dagen: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    toevoegen: "Andere klant toevoegen", urenInvullen: "Uren invullen", vanBart: "Opdracht van Bart", route: "Route", nietGepland: "Niet ingepland", klant: "Klant", uur: "uur", min: "min", notitie: "Wat heb je gedaan?", totaal: "Totaal deze week", insturen: "Week insturen",
    ingestuurd: "Ingestuurd. Bart ziet je uren nu.", goedgekeurd: "Goedgekeurd door Bart", wissel: "Andere persoon", geen: "Nog niets ingevuld",
  },
  pl: {
    wie: "Kim jesteś?", monteur: "Monter", bart: "Bart (biuro)", week: "Tydzień", dagen: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
    toevoegen: "Dodaj innego klienta", urenInvullen: "Wpisz godziny", vanBart: "Zadanie od Barta", route: "Trasa", nietGepland: "Brak planu", klant: "Klient", uur: "godz.", min: "min", notitie: "Co zrobiłeś?", totaal: "Razem w tym tygodniu", insturen: "Wyślij tydzień",
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
        const vorige = new Date(m); vorige.setDate(vorige.getDate() - 7);
        const vol = (k: string, u: number) => [0, 1, 2, 3, 4].map((dag) => ({ dag, klant: k, uren: u, notitie: "" }));
        setData({
          [sleutel("Piotr", vorige)]: { ingestuurd: true, goedgekeurd: true, regels: vol(KLANTEN[0], 8) },
          [sleutel("Marek", vorige)]: { ingestuurd: true, goedgekeurd: true, regels: vol(KLANTEN[0], 7.5) },
          [sleutel("Tomasz", vorige)]: { ingestuurd: true, goedgekeurd: true, regels: vol(KLANTEN[1], 8) },
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

/* ---------- planning: per monteur per dag waar hij heen gaat en wat hij moet doen ---------- */
type Plan = { klant: string; instructie: string };
const planSleutel = (monteur: string, maandag: Date, dag: number) => `${sleutel(monteur, maandag)}|${dag}`;
function usePlanning() {
  const [plan, setPlan] = useState<Record<string, Plan>>({});
  useEffect(() => {
    try {
      const s = localStorage.getItem("bm-planning");
      if (s) return setPlan(JSON.parse(s));
      const m = maandagVan(new Date());
      const v: Record<string, Plan> = {};
      [0, 1, 2, 3, 4].forEach((d) => {
        v[planSleutel("Piotr", m, d)] = { klant: KLANTEN[0], instructie: d === 0 ? "Oude kozijnen eruit, puin in de container voor de deur." : "Nieuwe kozijnen plaatsen en afkitten." };
        v[planSleutel("Marek", m, d)] = { klant: KLANTEN[0], instructie: "Samen met Piotr." };
        v[planSleutel("Tomasz", m, d)] = { klant: d < 2 ? KLANTEN[1] : KLANTEN[2], instructie: d < 2 ? "Rolluiken ophangen, sleutel bij de buren (nr. 33)." : "Inmeten 6 ramen, foto's maken." };
      });
      setPlan(v);
    } catch {}
  }, []);
  const zetPlan = (k: string, p: Plan | null) =>
    setPlan((o) => {
      const n = { ...o };
      if (p) n[k] = p; else delete n[k];
      try { localStorage.setItem("bm-planning", JSON.stringify(n)); } catch {}
      return n;
    });
  return { plan, zetPlan };
}

/* ---------- navigatie via de adresbalk, zodat de terugknop van de browser werkt ---------- */
function useHash() {
  const [h, setH] = useState("");
  useEffect(() => {
    const f = () => setH(location.hash.slice(1));
    f();
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  return [h, (n: string) => { if (n !== location.hash.slice(1)) location.hash = n; }] as const;
}

export default function Start() {
  const [hash, ga] = useHash();
  const deel = hash.split("/")[0];
  // Wie als monteur is ingelogd, blijft ingelogd op deze telefoon.
  const [ingelogd, setIngelogd] = useState<string | null>(null);
  useEffect(() => { try { setIngelogd(localStorage.getItem("bm-monteur")); } catch {} }, []);
  const rol: null | { soort: "monteur"; naam: string } | { soort: "bart" } = deel === "monteur" ? { soort: "monteur", naam: ingelogd ?? "Piotr" } : deel === "kantoor" ? { soort: "bart" } : null;
  const setRol = (r: typeof rol) => {
    if (r?.soort === "monteur") { try { localStorage.setItem("bm-monteur", r.naam); } catch {} setIngelogd(r.naam); }
    r ? ga(r.soort === "bart" ? "kantoor" : "monteur") : ga("");
  };
  const uitloggen = () => { try { localStorage.removeItem("bm-monteur"); } catch {} setIngelogd(null); ga(""); };
  // Monteurs: standaard Pools, Nederlands kan; de keuze wordt onthouden op deze telefoon.
  const [taal, zetTaal] = useState<Taal>("pl");
  useEffect(() => { try { const t = localStorage.getItem("bm-taal"); if (t === "nl" || t === "pl") zetTaal(t); } catch {} }, []);
  const setTaal = (t: Taal) => { zetTaal(t); try { localStorage.setItem("bm-taal", t); } catch {} };
  const opslag = { ...useOpslag(), ...usePlanning() };
  const t = T[taal];

  if (!rol) return <Inloggen taal={taal} setTaal={setTaal} kies={setRol} />;

  return (
    <>
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 pt-3 md:px-8">
        <button onClick={() => ga("")} aria-label="Home" className="flex items-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-[#1E5079]"><Home className="size-4" /></button>
        <button onClick={() => history.back()} aria-label="Terug" className="flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-[#1E5079]"><ChevronLeft className="size-4" /> {taal === "pl" ? "Wstecz" : "Terug"}</button>
        <button onClick={() => history.forward()} aria-label="Vooruit" className="flex items-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-[#1E5079]"><ChevronRight className="size-4" /></button>
        <button onClick={() => ga(rol.soort === "bart" ? "monteur" : "kantoor")} className="ml-auto flex items-center gap-1.5 rounded-xl bg-[#1E5079] px-3 py-2 text-sm font-semibold text-white">{rol.soort === "bart" ? <><HardHat className="size-4" /> Bekijk als monteur</> : <><UserCog className="size-4" /> {taal === "pl" ? "Biuro" : "Naar kantoor"}</>}</button>
        {rol.soort === "monteur" && ingelogd && <button onClick={uitloggen} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-600">{taal === "pl" ? "Wyloguj" : "Uitloggen"}</button>}
      </div>
      {rol.soort === "monteur" ? (
        <MonteurOmgeving naam={rol.naam} taal={taal} setTaal={setTaal} terug={() => setRol(null)} {...opslag} />
      ) : (
        <KantoorOmgeving terug={() => setRol(null)} {...opslag} />
      )}
    </>
  );
}

/* ---------- inloggen: eerst monteur of kantoor, dan je gegevens ---------- */
function Inloggen({ taal, setTaal, kies }: { taal: Taal; setTaal: (t: Taal) => void; kies: (r: { soort: "monteur"; naam: string } | { soort: "bart" }) => void }) {
  const { leden } = useTeam();
  const [naam, setNaam] = useState("");
  const [pin, setPin] = useState("");
  const [fout, setFout] = useState("");
  const L = taal === "pl"
    ? { titel: "Godziny pracy", monteur: "Jestem monterem", kantoor: "Biuro", naam: "Twoje imię", pin: "Kod PIN", in: "Zaloguj się", terug: "Wstecz", fout: "Imię lub kod PIN jest nieprawidłowy.", welkom: "Zaloguj się imieniem i kodem PIN, który dostałeś od Barta." }
    : { titel: "Werkbonnen", monteur: "Ik ben monteur", kantoor: "Kantoor", naam: "Je naam", pin: "Pincode", in: "Inloggen", terug: "Terug", fout: "Naam of pincode klopt niet.", welkom: "Log in met je naam en de pincode die je van Bart hebt gekregen." };
  const veld = "w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-lg outline-none focus:border-[#1E5079]";
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-lg font-bold text-[#1E5079]"><span className="grid size-9 place-items-center rounded-xl bg-[#1E5079] text-white"><HardHat className="size-5" /></span> BartMooi</span>
        <TaalKnop taal={taal} setTaal={setTaal} />
      </div>
      {(
        <form
          className="flex flex-1 flex-col justify-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const lid = leden.find((l) => l.naam.toLowerCase() === naam.trim().toLowerCase());
            if (lid && pinVan(lid) === pin) kies({ soort: "monteur", naam: lid.naam });
            else setFout(L.fout);
          }}>
          <h1 className="text-2xl font-bold">{L.in}</h1>
          <p className="mb-2 text-slate-600">{L.welkom}</p>
          <input autoFocus autoComplete="username" autoCapitalize="words" value={naam} onChange={(e) => { setNaam(e.target.value); setFout(""); }} placeholder={L.naam} className={veld} />
          <input inputMode="numeric" autoComplete="current-password" type="password" value={pin} maxLength={4} onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setFout(""); }} placeholder={L.pin} className={veld + " tracking-[0.5em]"} />
          {fout && <p className="text-sm font-semibold text-red-600">{fout}</p>}
          <button disabled={!naam.trim() || pin.length !== 4} className="mt-2 w-full rounded-2xl bg-[#1E5079] p-4 text-lg font-bold text-white disabled:opacity-40">{L.in}</button>
          <p className="pt-2 text-center text-xs text-slate-400">Demo: de pincodes staan bij Kantoor → Team.</p>
        </form>
      )}
    </main>
  );
}

/* ---------- tabbladen ---------- */
function Tabs<T extends string>({ tabs, actief, zet }: { tabs: [T, string][]; actief: T; zet: (t: T) => void }) {
  return (
    <nav className="sticky top-0 z-10 -mx-4 flex gap-1 bg-[#f4f6f8]/95 px-4 py-2 backdrop-blur">
      {tabs.map(([id, naam]) => (
        <button key={id} onClick={() => zet(id)} className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-bold ${actief === id ? "bg-[#1E5079] text-white" : "bg-white text-slate-700 shadow-sm"}`}>{naam}</button>
      ))}
    </nav>
  );
}

function MonteurOmgeving(p: { naam: string; taal: Taal; setTaal: (t: Taal) => void; terug: () => void } & ReturnType<typeof useOpslag> & ReturnType<typeof usePlanning>) {
  const [hash, ga] = useHash();
  const tab = (["uren", "overzicht", "cert"].includes(hash.split("/")[1]) ? hash.split("/")[1] : "uren") as "uren" | "overzicht" | "cert";
  const setTab = (t: string) => ga("monteur/" + t);
  const pl = p.taal === "pl";
  const { leden } = useTeam();
  const tabs: ["uren" | "overzicht" | "cert", string][] = pl ? [["uren", "Godziny"], ["overzicht", "Przegląd"], ["cert", "Certyfikaty"]] : [["uren", "Uren"], ["overzicht", "Mijn overzicht"], ["cert", "Certificaten"]];
  return (
    <div>
      <div className="mx-auto max-w-md px-4 pt-4"><Tabs tabs={tabs} actief={tab} zet={setTab} /></div>
      {tab === "uren" && <Monteur {...p} />}
      {tab === "overzicht" && <main className="mx-auto max-w-md space-y-6 p-4"><MijnOverzicht naam={p.naam} taal={p.taal} data={p.data} /><MijnFacturen naam={p.naam} data={p.data} leden={leden} pl={pl} /></main>}
      {tab === "cert" && <main className="mx-auto max-w-md p-4"><MijnCertificaten naam={p.naam} pl={pl} /></main>}
    </div>
  );
}

function KantoorOmgeving(p: { terug: () => void } & ReturnType<typeof useOpslag> & ReturnType<typeof usePlanning>) {
  const { team, leden } = useTeam();
  const { projecten } = useProjecten();
  const [hash, ga] = useHash();
  const tab = (["plan", "uren", "facturen", "cert", "projecten", "team"].includes(hash.split("/")[1]) ? hash.split("/")[1] : "plan") as "plan" | "uren" | "facturen" | "cert" | "projecten" | "team";
  const setTab = (t: string) => ga("kantoor/" + t);
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-4 md:px-8"><Tabs tabs={[["plan", "Planning"], ["uren", "Uren"], ["facturen", "Facturen"], ["cert", "Certificaten"], ["projecten", "Projecten"], ["team", "Team"]]} actief={tab} zet={setTab} /></div>
      {tab === "facturen" ? <FacturenKantoor data={p.data} leden={leden} projecten={projecten} /> : tab === "team" ? <TeamBeheer /> : tab === "projecten" ? <ProjectBeheer /> : tab === "plan" ? <Planbord plan={p.plan} zetPlan={p.zetPlan} data={p.data} /> : tab === "uren" ? <Bart {...p} /> : <main className="mx-auto max-w-5xl space-y-4 p-4 md:p-8"><h1 className="text-2xl font-bold">Certificaten</h1><CertificatenKantoor monteurs={team} /></main>}
    </div>
  );
}

/* ---------- de monteur: alles wat hij gewerkt heeft, per week en per jaar ---------- */
function MijnOverzicht({ naam, taal, data }: { naam: string; taal: Taal; data: Record<string, Week> }) {
  const pl = taal === "pl";
  const weken = Object.entries(data)
    .filter(([k]) => k.startsWith(naam + "|"))
    .map(([k, w]) => ({ maandag: new Date(k.split("|")[1]), w, uren: w.regels.reduce((s, r) => s + r.uren, 0) }))
    .filter((x) => x.uren > 0)
    .sort((a, b) => b.maandag.getTime() - a.maandag.getTime());
  const jaren = Array.from(new Set(weken.map((x) => x.maandag.getFullYear())));
  const L = pl
    ? { kop: "Mój przegląd", jaar: "Razem w roku", week: "Tydzień", leeg: "Brak godzin.", goed: "Zatwierdzone", in: "Wysłane", con: "Nie wysłane", uitleg: "Tylko zatwierdzone godziny liczą się do rozliczenia rocznego." }
    : { kop: "Mijn overzicht", jaar: "Totaal dit jaar", week: "Week", leeg: "Nog geen uren.", goed: "Goedgekeurd", in: "Ingestuurd", con: "Niet ingestuurd", uitleg: "Alleen goedgekeurde uren tellen mee voor de jaaropgave." };
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">{L.kop}</h2>
      {weken.length === 0 && <p className="text-slate-500">{L.leeg}</p>}
      {jaren.map((j) => {
        const vanJaar = weken.filter((x) => x.maandag.getFullYear() === j);
        const goedgekeurd = vanJaar.filter((x) => x.w.goedgekeurd).reduce((s, x) => s + x.uren, 0);
        return (
          <section key={j} className="space-y-2">
            <div className="rounded-2xl bg-[#1E5079] p-4 text-white">
              <p className="text-sm opacity-80">{L.jaar} {j}</p>
              <p className="text-3xl font-bold">{uurTekst(goedgekeurd)}</p>
              <p className="mt-1 text-xs opacity-80">{L.uitleg}</p>
            </div>
            {vanJaar.map((x) => (
              <details key={x.maandag.toISOString()} className="rounded-2xl bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold">{L.week} {weeknummer(x.maandag)}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${x.w.goedgekeurd ? "bg-green-100 text-green-800" : x.w.ingestuurd ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"}`}>{x.w.goedgekeurd ? L.goed : x.w.ingestuurd ? L.in : L.con}</span>
                  <span className="ml-auto font-bold">{uurTekst(x.uren)}</span>
                </summary>
                <ul className="space-y-1 border-t border-slate-100 p-4 text-sm text-slate-700">
                  {x.w.regels.slice().sort((a, b) => a.dag - b.dag).map((r, i) => <li key={i}><span className="font-semibold">{T[taal].dagen[r.dag]}</span> · {r.klant} · {uurTekst(r.uren)}{r.notitie ? ` · ${r.notitie}` : ""}</li>)}
                </ul>
              </details>
            ))}
          </section>
        );
      })}
    </div>
  );
}

function TaalKnop({ taal, setTaal }: { taal: Taal; setTaal: (t: Taal) => void }) {
  return (
    <div className="flex rounded-full bg-slate-200 p-0.5 text-sm font-bold">
      {(["pl", "nl"] as const).map((x) => (
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
function Monteur({ naam, taal, setTaal, terug, data, bewaar, plan }: { naam: string; taal: Taal; setTaal: (t: Taal) => void; terug: () => void } & ReturnType<typeof useOpslag> & ReturnType<typeof usePlanning>) {
  const { projecten, info, periode } = useProjecten();
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
        const gepland = plan[planSleutel(naam, maandag, dag)];
        return (
          <section key={dag} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-baseline justify-between">
              <h2 className="font-bold">{dagNaam}</h2>
              <span className="text-sm text-slate-500">{datumKort(datum, taal)}</span>
            </div>
            {gepland && (
              <div className="mb-3 rounded-xl bg-blue-50 p-3">
                <p className="flex items-start gap-2 font-semibold text-[#1E5079]"><MapPin className="mt-0.5 size-4 shrink-0" /> {gepland.klant}</p>
                {info[gepland.klant] && <p className="mt-1 text-sm text-slate-600">{info[gepland.klant]}</p>}
                {gepland.instructie && <p className="mt-1 text-sm text-slate-700"><span className="font-semibold">{t.vanBart}:</span> {gepland.instructie}</p>}
                <a href={`https://maps.google.com/?q=${encodeURIComponent(gepland.klant.split(", ").slice(1).join(", ") + " Den Haag")}`} target="_blank" rel="noopener" className="mt-2 inline-block text-sm font-semibold text-[#1E5079] underline">{t.route}</a>
              </div>
            )}
            {!gepland && regels.length === 0 && <p className="mb-2 text-sm text-slate-400">{t.nietGepland}</p>}
            {regels.map(({ r, i }) => (
              <div key={i} className="mb-3 space-y-2 border-b border-slate-100 pb-3 last:border-0">
                <select disabled={vast} value={r.klant} onChange={(e) => zet(week.regels.map((x, j) => (j === i ? { ...x, klant: e.target.value } : x)))} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-base">
                  {(projecten.includes(r.klant) ? projecten : [r.klant, ...projecten]).map((kl) => <option key={kl}>{kl}</option>)}
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
              <button onClick={() => zet([...week.regels, { dag, klant: regels.at(-1)?.r.klant ?? gepland?.klant ?? projecten[0] ?? "", uren: 8, notitie: "" }])} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-3 text-sm font-semibold text-slate-600">
                <Plus className="size-4" /> {gepland && regels.length === 0 ? t.urenInvullen : t.toevoegen}
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
function Bart({ terug, data, bewaar }: { terug: () => void } & ReturnType<typeof useOpslag> & ReturnType<typeof usePlanning>) {
  const { team } = useTeam();
  const [maandag, setMaandag] = useState(() => maandagVan(new Date()));
  const dagen = T.nl.dagen.map((d) => d.slice(0, 2));
  const rijen = useMemo(() => team.map((m) => ({ m, k: sleutel(m, maandag), w: data[sleutel(m, maandag)] })), [data, maandag, team]);



  return (
    <main className="mx-auto max-w-5xl space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <button onClick={terug} className="text-sm text-slate-600">← Andere persoon</button>
        
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

/* ---------- Bart: het planbord, maandag samen de week verdelen ---------- */
/* ---------- stoplicht per project: loopt het nog binnen prijs en einddatum? ---------- */
type Signaal = { kleur: "groen" | "oranje" | "rood" | "geen"; reden: string };
function datumUitSleutel(iso: string, dag = 0) {
  const d = new Date(iso + "T12:00");
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  d.setDate(d.getDate() + dag);
  return d;
}
function projectSignaal(p: string, prijs: number | undefined, eind: string | undefined, data: Record<string, Week>, plan: Record<string, Plan>, leden: Lid[]): Signaal {
  const tarief = (naam: string) => leden.find((l) => l.naam === naam)?.tarief ?? STANDAARD_TARIEF;
  const vandaag = isoDag(new Date());
  let uitgegeven = 0;
  const geschreven = new Set<string>();
  for (const [k, w] of Object.entries(data)) {
    const [naam, iso] = k.split("|");
    for (const r of w.regels) if (r.klant === p) { uitgegeven += r.uren * tarief(naam); geschreven.add(`${naam}|${isoDag(datumUitSleutel(iso, r.dag))}`); }
  }
  let verwacht = 0, dagenNog = 0, laatste = "";
  for (const [k, pl] of Object.entries(plan)) {
    if (pl.klant !== p) continue;
    const [naam, iso, dag] = k.split("|");
    const d = isoDag(datumUitSleutel(iso, Number(dag)));
    if (d > laatste) laatste = d;
    if (d >= vandaag && !geschreven.has(`${naam}|${d}`)) { verwacht += 8 * tarief(naam); dagenNog++; }
  }
  const redenen: string[] = [];
  let kleur: Signaal["kleur"] = "groen";
  const erger = (k: "oranje" | "rood") => { if (k === "rood" || kleur !== "rood") kleur = k; };
  if (eind && laatste > eind) {
    const over = Math.round((new Date(laatste + "T12:00").getTime() - new Date(eind + "T12:00").getTime()) / 86400000);
    redenen.push(`${over} ${over === 1 ? "dag" : "dagen"} over einddatum`); erger("rood");
  } else if (eind && eind < vandaag && dagenNog > 0) { redenen.push("einddatum voorbij"); erger("rood"); }
  if (prijs) {
    const nu = uitgegeven / prijs, straks = (uitgegeven + verwacht) / prijs;
    if (straks > 1) { redenen.push(`kosten straks ${Math.round(straks * 100)}% van de prijs`); erger("rood"); }
    else if (nu >= 0.7 || straks >= 0.9) { redenen.push(`budget ${Math.round(nu * 100)}% op${dagenNog ? `, nog ${dagenNog} ${dagenNog === 1 ? "dag" : "dagen"} ingepland` : ""}`); erger("oranje"); }
    else redenen.push(`budget ${Math.round(nu * 100)}% op`);
  } else if (!eind) return { kleur: "geen", reden: "geen prijs of einddatum" };
  return { kleur, reden: redenen.join(", ") || "op schema" };
}

function Planbord({ plan, zetPlan, data }: ReturnType<typeof usePlanning> & { data: Record<string, Week> }) {
  const { team, leden } = useTeam();
  const { projecten: alleProjecten, periode } = useProjecten();
  const [prijs] = useProjectPrijs();
  const signaal = Object.fromEntries(alleProjecten.map((p) => [p, projectSignaal(p, prijs[p], periode[p]?.eind, data, plan, leden)]));
  const aandacht = alleProjecten.filter((p) => signaal[p].kleur === "oranje" || signaal[p].kleur === "rood");
  const [alleenAandacht, setAlleenAandacht] = useState(false);
  const projecten = alleenAandacht ? aandacht : alleProjecten;
  const [maandag, setMaandag] = useState(() => maandagVan(new Date()));
  const [open, setOpen] = useState<null | { klant: string; dag: number }>(null);
  const dagen = ["Ma", "Di", "Wo", "Do", "Vr", "Za"];
  const vandaag = (new Date().getDay() + 6) % 7;
  const ditIsDezeWeek = maandagVan(new Date()).getTime() === maandag.getTime();
  const kort = (k: string) => k.split(", ").slice(1).join(", ") || k;
  return (
    <main className="mx-auto max-w-6xl space-y-4 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Planning</h1>
      <div className="max-w-sm"><WeekKiezer maandag={maandag} setMaandag={setMaandag} label="Week" taal="nl" /></div>

      {(() => {
        // Korte cijfers voor vandaag (of maandag, als je een andere week bekijkt).
        const d = ditIsDezeWeek && vandaag < 6 ? vandaag : 0;
        const vandaagPlan = team.map((m) => plan[planSleutel(m, maandag, d)]).filter(Boolean);
        const klussen = new Set(vandaagPlan.map((p) => p!.klant)).size;
        const vrij = team.length - vandaagPlan.length;
        const label = ditIsDezeWeek && vandaag < 6 ? "vandaag" : "op maandag";
        return (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[[vandaagPlan.length, `monteurs aan het werk ${label}`], [klussen, `lopende klussen ${label}`], [vrij, "niet ingepland"]].map(([n, t]) => (
              <div key={String(t)} className="rounded-2xl bg-white p-3 shadow-sm">
                <p className="text-2xl font-bold text-[#1E5079]">{n}</p>
                <p className="text-xs leading-tight text-slate-600">{t}</p>
              </div>
            ))}
            <button onClick={() => setAlleenAandacht(!alleenAandacht)} className={`rounded-2xl p-3 text-left shadow-sm ${alleenAandacht ? "bg-[#1E5079] text-white" : "bg-white"}`}>
              <p className={`text-2xl font-bold ${alleenAandacht ? "" : aandacht.length ? "text-red-600" : "text-green-700"}`}>{aandacht.length}</p>
              <p className={`text-xs leading-tight ${alleenAandacht ? "text-white/80" : "text-slate-600"}`}>{alleenAandacht ? "toon weer alle projecten" : "projecten die aandacht nodig hebben"}</p>
            </button>
          </div>
        );
      })()}

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[760px] table-fixed text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-xs text-slate-500">
              <th className="w-44 p-3">Project</th>
              {dagen.map((d, i) => { const dt = new Date(maandag); dt.setDate(dt.getDate() + i); return <th key={d} className={`p-3 ${ditIsDezeWeek && i === vandaag ? "text-[#1E5079]" : ""}`}>{d} {dt.getDate()}</th>; })}
            </tr>
          </thead>
          <tbody>
            {projecten.map((klant) => (
              <tr key={klant} className="border-b border-slate-100 last:border-0">
                <td className="p-3 align-top"><span className="block font-semibold leading-tight">{kort(klant)}</span><span className="text-xs text-slate-500">{klant.split(", ")[0]}</span>{periodeTekst(periode[klant]) && <span className="mt-1 block text-xs font-semibold text-[#1E5079]">{periodeTekst(periode[klant])}</span>}{signaal[klant] && signaal[klant].kleur !== "geen" && <span className={`mt-1 flex items-start gap-1.5 text-xs font-medium ${{ groen: "text-green-700", oranje: "text-amber-700", rood: "text-red-600" }[signaal[klant].kleur as "groen"]}`}><span className={`mt-1 size-2 shrink-0 rounded-full ${{ groen: "bg-green-500", oranje: "bg-amber-500", rood: "bg-red-500" }[signaal[klant].kleur as "groen"]}`} />{signaal[klant].reden}</span>}</td>
                {dagen.map((_, d) => {
                  const wie = team.filter((m) => plan[planSleutel(m, maandag, d)]?.klant === klant);
                  const dagIso = (() => { const x = new Date(maandag); x.setDate(x.getDate() + d); return isoDag(x); })();
                  const pr = periode[klant];
                  const buiten = !!pr && ((!!pr.start && dagIso < pr.start) || (!!pr.eind && dagIso > pr.eind));
                  const opdracht = wie.map((m) => plan[planSleutel(m, maandag, d)]?.instructie).find(Boolean);
                  return (
                    <td key={d} className={`p-1 align-top ${buiten ? "bg-slate-100/70" : ""}`}>
                      <button onClick={() => setOpen({ klant, dag: d })} className={`min-h-14 w-full rounded-lg p-1.5 text-left text-xs ${wie.length ? "bg-blue-50 hover:bg-blue-100" : "text-slate-300 hover:bg-slate-50"}`}>
                        {wie.length ? (
                          <>
                            {opdracht && <span className="mb-1.5 line-clamp-3 block font-medium text-slate-800">{opdracht}</span>}
                            <span className="flex flex-wrap gap-1">{wie.map((m) => <span key={m} className="rounded-full border border-[#1E5079]/40 px-2 py-0.5 text-[11px] font-semibold text-[#1E5079]">{m}</span>)}</span>
                          </>
                        ) : "+"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Tik op een vak om monteurs en een opdracht in te plannen. De monteur ziet het meteen op zijn telefoon.</p>

      {open && <PlanVenster klant={open.klant} dag={open.dag} maandag={maandag} plan={plan} zetPlan={zetPlan} sluit={() => setOpen(null)} />}
    </main>
  );
}

function PlanVenster({ klant, dag, maandag, plan, zetPlan, sluit }: { klant: string; dag: number; maandag: Date; sluit: () => void } & ReturnType<typeof usePlanning>) {
  const { team } = useTeam();
  const nu = team.filter((m) => plan[planSleutel(m, maandag, dag)]?.klant === klant);
  const [wie, setWie] = useState<string[]>(nu);
  const [instructie, setInstructie] = useState(nu.map((m) => plan[planSleutel(m, maandag, dag)]?.instructie).find(Boolean) ?? "");
  const [heleWeek, setHeleWeek] = useState(false);
  const opslaan = () => {
    for (const d of heleWeek ? [0, 1, 2, 3, 4] : [dag])
      for (const m of team) {
        const k = planSleutel(m, maandag, d);
        if (wie.includes(m)) zetPlan(k, { klant, instructie });
        else if (plan[k]?.klant === klant) zetPlan(k, null);
      }
    sluit();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-3 sm:items-center" onClick={sluit}>
      <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3">
          <div><h3 className="text-lg font-bold leading-tight">{klant.split(", ").slice(1).join(", ")}</h3><p className="text-sm text-slate-500">{T.nl.dagen[dag]}</p></div>
          <button onClick={sluit} aria-label="Sluiten" className="p-1 text-slate-500"><X className="size-5" /></button>
        </div>
        <div className="text-sm font-semibold">Wie gaat erheen?
          <div className="mt-1 flex flex-wrap gap-2">
            {team.map((m) => {
              const aan = wie.includes(m);
              const elders = plan[planSleutel(m, maandag, dag)];
              const bezet = !aan && elders && elders.klant !== klant;
              return (
                <button key={m} type="button" onClick={() => setWie(aan ? wie.filter((x) => x !== m) : [...wie, m])} className={`rounded-full px-4 py-2 text-sm font-semibold ${aan ? "bg-[#1E5079] text-white" : bezet ? "bg-amber-50 text-amber-800" : "bg-slate-100 text-slate-700"}`} title={bezet ? `Staat al bij ${elders.klant}` : undefined}>
                  {m}{bezet ? " •" : ""}
                </button>
              );
            })}
          </div>
          <p className="mt-1 text-xs font-normal text-slate-500">Oranje = staat die dag al ergens anders; aantikken verplaatst hem hierheen.</p>
        </div>
        <label className="block text-sm font-semibold">Opdracht
          <textarea value={instructie} onChange={(e) => setInstructie(e.target.value)} rows={3} placeholder="Bijv. 3 kozijnen plaatsen achterkant, sleutel bij de buren." className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-base font-normal" />
        </label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={heleWeek} onChange={(e) => setHeleWeek(e.target.checked)} className="size-4" /> Hele week (ma t/m vr) hetzelfde</label>
        <button onClick={opslaan} className="w-full rounded-xl bg-[#1E5079] py-3 font-bold text-white">Opslaan</button>
      </div>
    </div>
  );
}

/* ---------- uitnodigen via WhatsApp ---------- */
const APP_URL = "https://bartmooi-kantoor.vercel.app";
function pinVan(l: Lid) {
  if (l.pin) return l.pin;
  let h = 7; for (const c of l.naam) h = (h * 31 + c.charCodeAt(0)) % 9000;
  return String(1000 + h);
}
function whatsappLink(l: Lid) {
  const nr = l.telefoon.replace(/\D/g, "").replace(/^0/, "31");
  const pin = pinVan(l);
  const tekst = (l.taal ?? "pl") === "pl"
    ? `Cześć ${l.naam}! Oto Twój link do aplikacji BartMooi: ${APP_URL}\nZaloguj się swoim imieniem (${l.naam}) i kodem PIN: ${pin}\nWskazówka: dodaj aplikację do ekranu głównego telefonu.`
    : `Hoi ${l.naam}! Hier is je link naar de BartMooi-app: ${APP_URL}\nLog in met je naam (${l.naam}) en pincode: ${pin}\nTip: zet de app op het beginscherm van je telefoon.`;
  return `https://wa.me/${nr}?text=${encodeURIComponent(tekst)}`;
}

/* ---------- Bart: zijn team instellen ---------- */
function TeamBeheer() {
  const { leden, zetTeam } = useTeam();
  const [naam, setNaam] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [tarief, setTarief] = useState("");
  const [weg, setWeg] = useState<string | null>(null);
  const [gegevens, setGegevens] = useState<string | null>(null);
  const veld = "w-full rounded-xl border border-slate-300 bg-white p-3 text-base";
  const pas = (naam: string, v: Partial<Lid>) => zetTeam(leden.map((x) => (x.naam === naam ? { ...x, ...v } : x)));
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Team</h1>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {leden.length === 0 && <p className="p-4 text-slate-500">Nog niemand in het team.</p>}
        {leden.map((l) => (
          <div key={l.naam} className="flex items-start gap-3 border-b border-slate-100 p-4 last:border-0">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1E5079] font-bold text-white">{l.naam[0]}</span>
            <div className="min-w-0 flex-1"><p className="font-semibold">{l.naam}</p><p className="text-sm text-slate-500">{l.telefoon || "Geen telefoonnummer"} · pincode {pinVan(l)} · {l.bedrijf || "geen bedrijf"} · €{(l.tarief ?? STANDAARD_TARIEF).toLocaleString("nl-NL")}/u</p>
              <button onClick={() => setGegevens(gegevens === l.naam ? null : l.naam)} className="mt-1 text-sm font-semibold text-[#1E5079] underline">{gegevens === l.naam ? "Klaar" : "Bedrijfsgegevens"}</button>
              {gegevens === l.naam && (
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-slate-600">Bedrijfsnaam<input defaultValue={l.bedrijf} onBlur={(e) => pas(l.naam, { bedrijf: e.target.value.trim() })} className={veld + " mt-1"} /></label>
                  <label className="text-xs font-semibold text-slate-600">Uurtarief (€)<input defaultValue={l.tarief ?? STANDAARD_TARIEF} inputMode="decimal" onBlur={(e) => pas(l.naam, { tarief: parseFloat(e.target.value.replace(",", ".")) || STANDAARD_TARIEF })} className={veld + " mt-1"} /></label>
                  <label className="text-xs font-semibold text-slate-600">KvK-nummer<input defaultValue={l.kvk} onBlur={(e) => pas(l.naam, { kvk: e.target.value.trim() })} className={veld + " mt-1"} /></label>
                  <label className="text-xs font-semibold text-slate-600">Btw-nummer<input defaultValue={l.btw} onBlur={(e) => pas(l.naam, { btw: e.target.value.trim() })} className={veld + " mt-1"} /></label>
                  <label className="text-xs font-semibold text-slate-600 sm:col-span-2">IBAN<input defaultValue={l.iban} onBlur={(e) => pas(l.naam, { iban: e.target.value.trim() })} className={veld + " mt-1"} /></label>
                </div>
              )}
            </div>
            <span className="flex shrink-0 items-center gap-1">
              <button onClick={() => pas(l.naam, { taal: (l.taal ?? "pl") === "pl" ? "nl" : "pl" })} title="Taal van het bericht" className="rounded-lg border border-slate-300 px-2 py-1.5 text-xs font-bold uppercase text-slate-600">{l.taal ?? "pl"}</button>
              {l.telefoon && <a href={whatsappLink(l)} target="_blank" rel="noopener" title="Stuur link en pincode via WhatsApp" className="flex items-center gap-1 rounded-lg bg-[#25D366] px-3 py-1.5 text-sm font-bold text-white"><Send className="size-4" /> WhatsApp</a>}
            </span>
            {weg === l.naam ? (
              <span className="flex gap-2">
                <button onClick={() => { zetTeam(leden.filter((x) => x.naam !== l.naam)); setWeg(null); }} className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold text-white">Ja, weghalen</button>
                <button onClick={() => setWeg(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Nee</button>
              </span>
            ) : (
              <button onClick={() => setWeg(l.naam)} className="text-sm font-semibold text-red-600">Weghalen</button>
            )}
          </div>
        ))}
      </div>
      <form
        className="space-y-2 rounded-2xl bg-white p-4 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const n = naam.trim();
          if (!n || leden.some((l) => l.naam.toLowerCase() === n.toLowerCase())) return;
          zetTeam([...leden, { naam: n, telefoon: telefoon.trim(), pin: String(1000 + Math.floor(Math.random() * 9000)), tarief: parseFloat(tarief.replace(",", ".")) || STANDAARD_TARIEF }]);
          setNaam(""); setTelefoon(""); setTarief("");
        }}>
        <p className="font-bold">Iemand toevoegen</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <input value={naam} onChange={(e) => setNaam(e.target.value)} placeholder="Naam" className={veld} />
          <input value={telefoon} onChange={(e) => setTelefoon(e.target.value)} placeholder="Telefoonnummer" inputMode="tel" className={veld} />
          <label className="text-sm font-semibold sm:col-span-2">Uurloon (€ per uur)<input value={tarief} onChange={(e) => setTarief(e.target.value.replace(/[^\d,.]/g, ""))} placeholder={`Bijv. ${STANDAARD_TARIEF}`} inputMode="decimal" className={veld + " mt-1"} /></label>
        </div>
        <button disabled={!naam.trim()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E5079] p-3 font-bold text-white disabled:opacity-40"><Plus className="size-4" /> Toevoegen</button>
        <p className="text-xs text-slate-500">Straks krijgt een nieuwe monteur een sms met zijn eigen link naar de app.</p>
      </form>
    </main>
  );
}

/* ---------- Bart: zijn projecten instellen ---------- */
function ProjectBeheer() {
  const { projecten, zetProjecten, info, zetInfo, periode, zetPeriode } = useProjecten();
  const [prijs, zetPrijs] = useProjectPrijs();
  const [nieuwPrijs, setNieuwPrijs] = useState("");
  const [start, setStart] = useState("");
  const [eind, setEind] = useState("");
  const [wat, setWat] = useState("");
  const [bewerk, setBewerk] = useState<string | null>(null);
  const [klant, setKlant] = useState("");
  const [adres, setAdres] = useState("");
  const [weg, setWeg] = useState<string | null>(null);
  const veld = "w-full rounded-xl border border-slate-300 bg-white p-3 text-base";
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Projecten</h1>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        {projecten.length === 0 && <p className="p-4 text-slate-500">Nog geen projecten.</p>}
        {projecten.map((p) => {
          const [k, ...rest] = p.split(", ");
          return (
            <div key={p} className="flex items-start gap-3 border-b border-slate-100 p-4 last:border-0">
              <MapPin className="size-5 shrink-0 text-[#1E5079]" />
              <div className="min-w-0 flex-1"><p className="font-semibold">{rest.join(", ") || k}</p>{rest.length > 0 && <p className="text-sm text-slate-500">{k}</p>}
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                  <input type="date" value={periode[p]?.start ?? ""} onChange={(e) => zetPeriode({ ...periode, [p]: { start: e.target.value, eind: periode[p]?.eind ?? "" } })} className="rounded-lg border border-slate-300 px-2 py-1" />
                  <span className="text-slate-400">tot</span>
                  <input type="date" value={periode[p]?.eind ?? ""} onChange={(e) => zetPeriode({ ...periode, [p]: { start: periode[p]?.start ?? "", eind: e.target.value } })} className="rounded-lg border border-slate-300 px-2 py-1" />
                  <span className="ml-auto inline-flex items-center gap-1 font-semibold">€<input inputMode="numeric" value={prijs[p] || ""} placeholder="Prijs" onChange={(e) => zetPrijs({ ...prijs, [p]: parseInt(e.target.value.replace(/\D/g, "") || "0", 10) })} className="w-28 rounded-lg border border-slate-300 px-2 py-1 text-right" /></span>
                </div>
                {bewerk === p ? (
                  <textarea autoFocus defaultValue={info[p] ?? ""} rows={3} onBlur={(e) => { zetInfo({ ...info, [p]: e.target.value.trim() }); setBewerk(null); }} className="mt-2 w-full rounded-xl border border-slate-300 p-2 text-sm" />
                ) : (
                  <button onClick={() => setBewerk(p)} className="mt-1 block text-left text-sm text-slate-700">{info[p] || <span className="text-[#1E5079] underline">Omschrijving toevoegen</span>}</button>
                )}</div>
              {weg === p ? (
                <span className="flex gap-2">
                  <button onClick={() => { zetProjecten(projecten.filter((x) => x !== p)); setWeg(null); }} className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold text-white">Ja, weghalen</button>
                  <button onClick={() => setWeg(null)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Nee</button>
                </span>
              ) : (
                <button onClick={() => setWeg(p)} className="text-sm font-semibold text-red-600">Weghalen</button>
              )}
            </div>
          );
        })}
      </div>
      <form
        className="space-y-2 rounded-2xl bg-white p-4 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          const n = `${klant.trim()}, ${adres.trim()}`;
          if (!klant.trim() || !adres.trim() || projecten.includes(n)) return;
          zetProjecten([...projecten, n]);
          if (wat.trim()) zetInfo({ ...info, [n]: wat.trim() });
          if (start || eind) zetPeriode({ ...periode, [n]: { start, eind } });
          if (nieuwPrijs) zetPrijs({ ...prijs, [n]: parseInt(nieuwPrijs, 10) });
          setKlant(""); setAdres(""); setWat(""); setStart(""); setEind(""); setNieuwPrijs("");
        }}>
        <p className="font-bold">Project toevoegen</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <input value={klant} onChange={(e) => setKlant(e.target.value)} placeholder="Klant, bijv. Familie Bakker" className={veld} />
          <input value={adres} onChange={(e) => setAdres(e.target.value)} placeholder="Adres, bijv. Kerkstraat 5" className={veld} />
        </div>
        <textarea value={wat} onChange={(e) => setWat(e.target.value)} rows={3} placeholder="Wat voor project en wat moet er gebeuren? Bijv. 4 kunststof kozijnen vervangen achterkant." className={veld} />
        <div className="grid grid-cols-2 gap-2">
          <label className="text-sm font-semibold">Begindatum<input type="date" value={start} onChange={(e) => setStart(e.target.value)} className={veld + " mt-1"} /></label>
          <label className="text-sm font-semibold">Einddatum<input type="date" value={eind} min={start || undefined} onChange={(e) => setEind(e.target.value)} className={veld + " mt-1"} /></label>
        </div>
        <label className="block text-sm font-semibold">Prijs voor de opdrachtgever (€, excl. btw)<input inputMode="numeric" value={nieuwPrijs} onChange={(e) => setNieuwPrijs(e.target.value.replace(/\D/g, ""))} placeholder="Bijv. 4500" className={veld + " mt-1"} /></label>
        <button disabled={!klant.trim() || !adres.trim()} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1E5079] p-3 font-bold text-white disabled:opacity-40"><Plus className="size-4" /> Toevoegen</button>
        <p className="text-xs text-slate-500">Een nieuw project staat meteen in het planbord en bij de monteurs in de lijst.</p>
      </form>
    </main>
  );
}

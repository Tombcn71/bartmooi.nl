"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Award, Check, Clock, Coffee, Download, FileText, Folder, History, LayoutDashboard, Lock, Play, Plus, Square, Trash2, Users } from "lucide-react";
import { BONNEN, CERT_SOORTEN, CERTS, KOLOMMEN, MONTEURS, PROJECTEN, TEAM, VEREIST, certStatus, certVan, datumNL, euro, uren, type Bon, type Kolom, type Project } from "./data";

type Taal = "nl" | "pl";
const T = {
  nl: { titel: "Mijn werkdag", project: "Project", in: "Inchecken", uit: "Uitchecken", pauze: "Pauze starten", pauzeStop: "Pauze stoppen", opm: "Opmerking (bijvoorbeeld wat je gedaan hebt)", week: "Mijn week", totaal: "Totaal", werkt: "Je werkt nu", opgeslagen: "Werkbon opgeslagen", uur: "uur" },
  pl: { titel: "Mój dzień pracy", project: "Projekt", in: "Zacznij pracę", uit: "Zakończ pracę", pauze: "Zacznij przerwę", pauzeStop: "Zakończ przerwę", opm: "Uwagi (np. co zostało zrobione)", week: "Mój tydzień", totaal: "Razem", werkt: "Teraz pracujesz", opgeslagen: "Karta pracy zapisana", uur: "godz." },
} as const;

const kaart = "rounded-2xl border border-slate-200 bg-white shadow-sm";
const knop = "rounded-xl px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98]";
const blauw = `${knop} bg-blue-600 text-white hover:bg-blue-700`;
const grijs = `${knop} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;

export default function Home() {
  const [rol, setRol] = useState<"monteur" | "beheer" | null>(null);
  // De pagina volgt het adres (#beheer/bord enz.), zodat de terugknop van de browser en van de telefoon werkt.
  useEffect(() => {
    const lees = () => {
      const h = window.location.hash.replace("#", "");
      setRol(h.startsWith("beheer") ? "beheer" : h.startsWith("monteur") ? "monteur" : null);
    };
    lees();
    window.addEventListener("hashchange", lees);
    return () => window.removeEventListener("hashchange", lees);
  }, []);
  const ga = (r: "monteur" | "beheer" | null) => {
    window.location.hash = r ?? "";
  };
  const [projecten, setProjecten] = useState<Project[]>(PROJECTEN);
  const [bonnen, setBonnen] = useState<Bon[]>(BONNEN);
  const [melding, setMelding] = useState("");
  const toon = (t: string) => {
    setMelding(t);
    setTimeout(() => setMelding(""), 2500);
  };

  if (!rol) return <Inloggen kies={ga} />;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => ga(null)} className={`${grijs} flex items-center gap-1 px-3 py-2`}><ArrowLeft className="size-4" /> Terug</button>
            <div className="hidden items-center gap-2 font-bold sm:flex">
              <span className="grid size-8 place-items-center rounded-lg bg-blue-600 text-white"><Clock className="size-4" /></span>
              Werkbonnen
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-slate-500 sm:inline">{rol === "beheer" ? "Bart · Beheer" : "Piotr · Monteur"}</span>

          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-5">
        {rol === "monteur" ? <Monteur projecten={projecten} setProjecten={setProjecten} bonnen={bonnen} setBonnen={setBonnen} toon={toon} /> : <Beheer projecten={projecten} setProjecten={setProjecten} bonnen={bonnen} toon={toon} />}
      </main>
      {melding && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-xl">{melding}</div>}
    </div>
  );
}

/* ------------------------------ Monteur ------------------------------ */
function Monteur({ projecten, setProjecten, bonnen, setBonnen, toon }: { projecten: Project[]; setProjecten: (p: Project[]) => void; bonnen: Bon[]; setBonnen: (b: Bon[]) => void; toon: (t: string) => void }) {
  const [taal, setTaal] = useState<Taal>("nl");
  const t = T[taal];
  const [projectId, setProjectId] = useState(projecten.find((p) => p.kolom !== "Gefactureerd")!.id);
  const [start, setStart] = useState<Date | null>(null);
  const [pauze, setPauze] = useState(false);
  const [pauzeMin, setPauzeMin] = useState(0);
  const [opm, setOpm] = useState("");
  const [, tik] = useState(0);
  useEffect(() => {
    const i = setInterval(() => tik((x) => x + 1), 1000);
    return () => clearInterval(i);
  }, []);
  const verstreken = start ? Math.floor((Date.now() - start.getTime()) / 1000) : 0;
  const hhmm = (d: Date) => d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
  const klok = `${String(Math.floor(verstreken / 3600)).padStart(2, "0")}:${String(Math.floor((verstreken % 3600) / 60)).padStart(2, "0")}:${String(verstreken % 60).padStart(2, "0")}`;
  const project = projecten.find((p) => p.id === projectId)!;

  const inchecken = () => {
    setStart(new Date());
    setPauzeMin(0);
    setProjecten(projecten.map((p) => (p.id === projectId && p.kolom === "Gepland" ? { ...p, kolom: "Bezig" as Kolom } : p)));
  };
  const uitchecken = () => {
    const nu = new Date();
    const nieuw: Bon = { id: "n" + Date.now(), monteur: "Piotr Kowalski", project: project.naam, dag: "di 24 nov", week: 48, start: hhmm(start!), eind: hhmm(nu), pauze: pauzeMin, opmerking: opm, vergrendeld: false };
    setBonnen([nieuw, ...bonnen]);
    setStart(null);
    setPauze(false);
    setOpm("");
    toon(t.opgeslagen);
  };
  const mijn = bonnen.filter((b) => b.monteur === "Piotr Kowalski" && b.week === 48);
  const totaal = mijn.reduce((a, b) => a + uren(b), 0);

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-bold">{t.titel}</h1>
        <div className="flex rounded-lg bg-slate-200 p-0.5 text-xs font-bold">
          {(["nl", "pl"] as const).map((k) => (
            <button key={k} onClick={() => setTaal(k)} className={`rounded-md px-3 py-1 uppercase ${taal === k ? "bg-white shadow-sm" : "text-slate-500"}`}>{k}</button>
          ))}
        </div>
      </div>
      <div className={`${kaart} p-4`}>
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.project}</label>
        <select disabled={!!start} value={projectId} onChange={(e) => setProjectId(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base">
          {projecten.filter((p) => p.kolom !== "Gefactureerd").map((p) => <option key={p.id} value={p.id}>{p.naam}</option>)}
        </select>
        {start ? (
          <div className="mt-5 text-center">
            <p className="text-sm font-medium text-green-700">{t.werkt} · {hhmm(start)}</p>
            <p className="my-2 font-mono text-5xl font-bold tabular-nums">{klok}</p>
            <textarea value={opm} onChange={(e) => setOpm(e.target.value)} placeholder={t.opm} rows={2} className="my-2 w-full rounded-xl border border-slate-300 p-3 text-sm" />
            <button onClick={() => { setPauze(!pauze); if (!pauze) setPauzeMin(pauzeMin + 30); }} className={`${grijs} mb-3 flex w-full items-center justify-center gap-2`}>
              <Coffee className="size-4" /> {pauze ? t.pauzeStop : t.pauze} {pauzeMin ? `· ${pauzeMin} min` : ""}
            </button>
            <button onClick={uitchecken} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-5 text-lg font-bold text-white active:scale-[0.98]"><Square className="size-5" /> {t.uit}</button>
          </div>
        ) : (
          <button onClick={inchecken} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-6 text-xl font-bold text-white active:scale-[0.98]"><Play className="size-6" /> {t.in}</button>
        )}
      </div>
      <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide text-slate-500">{t.week}</h2>
      <div className={`${kaart} divide-y divide-slate-100`}>
        {mijn.map((b) => (
          <div key={b.id} className="flex items-center justify-between gap-3 p-3 text-sm">
            <div className="min-w-0"><p className="truncate font-semibold">{b.project}</p><p className="text-slate-500">{b.dag} · {b.start}–{b.eind}</p></div>
            <span className="shrink-0 font-bold">{uren(b)} {t.uur}</span>
          </div>
        ))}
        <div className="flex justify-between p-3 text-sm font-bold"><span>{t.totaal}</span><span>{Math.round(totaal * 100) / 100} {t.uur}</span></div>
      </div>
      <h2 className="mb-2 mt-6 text-sm font-bold uppercase tracking-wide text-slate-500">{taal === "nl" ? "Mijn certificaten" : "Moje certyfikaty"}</h2>
      <div className={`${kaart} divide-y divide-slate-100`}>
        {CERTS.filter((c) => c.monteur === "Piotr Kowalski").map((c) => {
          const st = certStatus(c);
          return (
            <div key={c.soort} className="flex items-center justify-between gap-3 p-3 text-sm">
              <div><p className="font-semibold">{c.soort}</p><p className="text-slate-500">{taal === "nl" ? "tot" : "do"} {datumNL(c.verloopt)}</p></div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${stKleur[st]}`}>{stTekst[st]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ Beheer ------------------------------ */
type Tab = "overzicht" | "bord" | "bonnen" | "projecten" | "certificaten" | "facturen" | "geschiedenis" | "monteurs";
const TABS: { id: Tab; naam: string; icon: typeof Clock }[] = [
  { id: "overzicht", naam: "Overzicht", icon: LayoutDashboard },
  { id: "bord", naam: "Bord", icon: Folder },
  { id: "bonnen", naam: "Werkbonnen", icon: Clock },
  { id: "projecten", naam: "Projecten", icon: Folder },
  { id: "certificaten", naam: "Certificaten", icon: Award },
  { id: "facturen", naam: "Facturen", icon: FileText },
  { id: "geschiedenis", naam: "Geschiedenis", icon: History },
  { id: "monteurs", naam: "Monteurs", icon: Users },
];

function Beheer({ projecten, setProjecten, bonnen, toon }: { projecten: Project[]; setProjecten: (p: Project[]) => void; bonnen: Bon[]; toon: (t: string) => void }) {
  const [tab, setTabState] = useState<Tab>("overzicht");
  useEffect(() => {
    const lees = () => {
      const t = window.location.hash.replace("#beheer/", "") as Tab;
      setTabState(TABS.some((x) => x.id === t) ? t : "overzicht");
    };
    lees();
    window.addEventListener("hashchange", lees);
    return () => window.removeEventListener("hashchange", lees);
  }, []);
  const setTab = (t: Tab) => {
    window.location.hash = "beheer/" + t;
  };
  return (
    <div className="grid gap-4 md:grid-cols-[200px_1fr]">
      <nav className="flex gap-1 overflow-x-auto md:flex-col">
        {TABS.map((x) => (
          <button key={x.id} onClick={() => setTab(x.id)} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold ${tab === x.id ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-white"}`}>
            <x.icon className="size-4" /> {x.naam}
          </button>
        ))}
      </nav>
      <section className="min-w-0">
        {tab === "overzicht" && <Overzicht projecten={projecten} bonnen={bonnen} />}
        {tab === "bord" && <Bord projecten={projecten} setProjecten={setProjecten} />}
        {tab === "bonnen" && <Bonnen bonnen={bonnen} />}
        {tab === "projecten" && <Projecten projecten={projecten} setProjecten={setProjecten} toon={toon} />}
        {tab === "certificaten" && <Certificaten toon={toon} />}
        {tab === "facturen" && <Facturen projecten={projecten} setProjecten={setProjecten} toon={toon} />}
        {tab === "geschiedenis" && <Geschiedenis bonnen={bonnen} toon={toon} />}
        {tab === "monteurs" && <Monteurs toon={toon} />}
      </section>
    </div>
  );
}

const bedragVan = (p: Project) => (p.tarief.soort === "uur" ? p.uren * p.tarief.bedrag : p.tarief.bedrag);

function Overzicht({ projecten, bonnen }: { projecten: Project[]; bonnen: Bon[] }) {
  const werkend = projecten.filter((p) => p.kolom === "Bezig").flatMap((p) => p.werkt.map((m) => ({ m, p })));
  const nogNiet = projecten.filter((p) => p.kolom === "Klaar om te factureren");
  const uurWeek = bonnen.filter((b) => b.week === 48).reduce((a, b) => a + uren(b), 0);
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {[["Nu aan het werk", `${werkend.length} monteurs`], ["Uren deze week", `${Math.round(uurWeek * 10) / 10} uur`], ["Nog te factureren", euro(nogNiet.reduce((a, p) => a + bedragVan(p), 0))]].map(([k, v]) => (
          <div key={k} className={`${kaart} p-4`}><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{k}</p><p className="mt-1 text-2xl font-bold">{v}</p></div>
        ))}
      </div>
      <div className={kaart}>
        <h2 className="border-b border-slate-100 p-4 font-bold">Wie werkt waar (vandaag)</h2>
        {MONTEURS.map((m) => {
          const w = werkend.find((x) => x.m === m);
          return (
            <div key={m} className="flex items-center justify-between gap-3 border-b border-slate-100 p-4 last:border-0">
              <span className="font-semibold">{m}</span>
              {w ? <span className="flex items-center gap-2 text-sm text-green-700"><span className="size-2 rounded-full bg-green-500" /> {w.p.naam}</span> : <span className="text-sm text-slate-400">Niet ingecheckt</span>}
            </div>
          );
        })}
      </div>
      {nogNiet.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <b>Klaar maar nog niet gefactureerd:</b> {nogNiet.map((p) => p.naam).join(", ")}.
        </div>
      )}
    </div>
  );
}

function Bord({ projecten, setProjecten }: { projecten: Project[]; setProjecten: (p: Project[]) => void }) {
  const [sleep, setSleep] = useState<string | null>(null);
  const zet = (id: string, kolom: Kolom) => setProjecten(projecten.map((p) => (p.id === id ? { ...p, kolom } : p)));
  return (
    <div className="grid gap-3 overflow-x-auto md:grid-cols-4">
      {KOLOMMEN.map((k, i) => (
        <div key={k} onDragOver={(e) => e.preventDefault()} onDrop={() => sleep && zet(sleep, k)} className="min-w-56 rounded-2xl bg-slate-200/70 p-2.5">
          <h3 className="mb-2 flex items-center justify-between px-1 text-sm font-bold">{k}<span className="rounded-full bg-white px-2 text-xs">{projecten.filter((p) => p.kolom === k).length}</span></h3>
          <div className="space-y-2">
            {projecten.filter((p) => p.kolom === k).map((p) => (
              <div key={p.id} draggable onDragStart={() => setSleep(p.id)} className={`${kaart} cursor-grab p-3 text-sm`}>
                <p className="font-bold leading-snug">{p.naam}</p>
                <p className="text-slate-500">{p.klant}</p>
                <p className="mt-1 text-slate-600">{p.uren} uur{p.werkt.length ? ` · ${p.werkt.join(", ")}` : ""}</p>
                <div className="mt-2 flex gap-1.5">
                  {i > 0 && <button onClick={() => zet(p.id, KOLOMMEN[i - 1])} className="rounded-lg border border-slate-200 px-2 py-1 text-xs">←</button>}
                  {k === "Bezig" ? <button onClick={() => zet(p.id, "Klaar om te factureren")} className="rounded-lg bg-blue-600 px-2 py-1 text-xs font-semibold text-white">Project afgerond</button> : i < 3 && <button onClick={() => zet(p.id, KOLOMMEN[i + 1])} className="rounded-lg border border-slate-200 px-2 py-1 text-xs">→</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Bonnen({ bonnen }: { bonnen: Bon[] }) {
  const [monteur, setMonteur] = useState("");
  const [project, setProject] = useState("");
  const [week, setWeek] = useState("");
  const lijst = bonnen.filter((b) => (!monteur || b.monteur === monteur) && (!project || b.project === project) && (!week || String(b.week) === week));
  const sel = "rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm";
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <select className={sel} value={monteur} onChange={(e) => setMonteur(e.target.value)}><option value="">Alle monteurs</option>{MONTEURS.map((m) => <option key={m}>{m}</option>)}</select>
        <select className={sel} value={project} onChange={(e) => setProject(e.target.value)}><option value="">Alle projecten</option>{PROJECTEN.map((p) => <option key={p.id}>{p.naam}</option>)}</select>
        <select className={sel} value={week} onChange={(e) => setWeek(e.target.value)}><option value="">Alle weken</option>{[48, 47, 33].map((w) => <option key={w} value={w}>Week {w}</option>)}</select>
      </div>
      <div className={`${kaart} overflow-x-auto`}>
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500"><tr>{["Dag", "Monteur", "Project", "Tijd", "Pauze", "Uren", ""].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>
            {lijst.map((b) => (
              <tr key={b.id} className="border-b border-slate-50 last:border-0">
                <td className="p-3">{b.dag}</td><td className="p-3 font-semibold">{b.monteur}</td><td className="p-3">{b.project}</td><td className="p-3">{b.start}–{b.eind}</td><td className="p-3">{b.pauze} min</td><td className="p-3 font-bold">{uren(b)}</td>
                <td className="p-3">{b.vergrendeld && <Lock className="size-4 text-slate-400" />}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {lijst.length === 0 && <p className="p-6 text-center text-slate-400">Geen werkbonnen gevonden.</p>}
      </div>
      <p className="text-xs text-slate-500">Een slotje betekent: afgerond of gefactureerd. Wijzigingen blijven zichtbaar met datum en wie het deed.</p>
    </div>
  );
}

function Projecten({ projecten, setProjecten, toon }: { projecten: Project[]; setProjecten: (p: Project[]) => void; toon: (t: string) => void }) {
  const [naam, setNaam] = useState("");
  const [klant, setKlant] = useState("");
  const [soort, setSoort] = useState<"uur" | "vast">("uur");
  const [bedrag, setBedrag] = useState(48);
  const inp = "rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm";
  const voeg = () => {
    if (!naam.trim()) return;
    setProjecten([...projecten, { id: "p" + Date.now(), naam, klant: klant || "—", tarief: { soort, bedrag }, kolom: "Gepland", uren: 0, werkt: [] }]);
    setNaam("");
    setKlant("");
    toon("Project toegevoegd");
  };
  return (
    <div className="space-y-4">
      <div className={`${kaart} flex flex-wrap items-end gap-2 p-4`}>
        <input className={`${inp} min-w-48 flex-1`} placeholder="Projectnaam" value={naam} onChange={(e) => setNaam(e.target.value)} />
        <input className={`${inp} min-w-40`} placeholder="Opdrachtgever" value={klant} onChange={(e) => setKlant(e.target.value)} />
        <select className={inp} value={soort} onChange={(e) => setSoort(e.target.value as "uur" | "vast")}><option value="uur">Uurtarief</option><option value="vast">Vaste prijs</option></select>
        <input className={`${inp} w-28`} type="number" value={bedrag} onChange={(e) => setBedrag(Number(e.target.value))} />
        <button onClick={voeg} className={`${blauw} flex items-center gap-1`}><Plus className="size-4" /> Project</button>
      </div>
      <div className={`${kaart} divide-y divide-slate-100`}>
        {projecten.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-2 p-4 text-sm">
            <div><p className="font-bold">{p.naam}</p><p className="text-slate-500">{p.klant}</p></div>
            <div className="text-right"><p className="font-semibold">{p.tarief.soort === "uur" ? `${euro(p.tarief.bedrag)} per uur` : `Vast ${euro(p.tarief.bedrag)}`}</p><p className="text-slate-500">{p.kolom} · {p.uren} uur</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

type Status = "concept" | "goedgekeurd" | "verzonden" | "credit";
function Facturen({ projecten, setProjecten, toon }: { projecten: Project[]; setProjecten: (p: Project[]) => void; toon: (t: string) => void }) {
  const [status, setStatus] = useState<Record<string, Status>>({ p6: "verzonden" });
  const [nummer, setNummer] = useState<Record<string, string>>({ p6: "2026-0006" });
  const [volgend, setVolgend] = useState(7);
  const lijst = projecten.filter((p) => p.kolom === "Klaar om te factureren" || p.kolom === "Gefactureerd");
  const verstuur = (p: Project) => {
    setNummer({ ...nummer, [p.id]: `2026-${String(volgend).padStart(4, "0")}` });
    setVolgend(volgend + 1);
    setStatus({ ...status, [p.id]: "verzonden" });
    setProjecten(projecten.map((x) => (x.id === p.id ? { ...x, kolom: "Gefactureerd" as Kolom } : x)));
    toon("Factuur per e-mail verstuurd (als pdf)");
  };
  return (
    <div className="space-y-3">
      {lijst.length === 0 && <p className="text-slate-500">Er zijn geen facturen. Zet een project op &ldquo;Project afgerond&rdquo; op het bord.</p>}
      {lijst.map((p) => {
        const s = status[p.id] ?? "concept";
        const ex = bedragVan(p);
        return (
          <div key={p.id} className={`${kaart} p-4`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div><p className="font-bold">{p.naam}</p><p className="text-sm text-slate-500">{p.klant} · {p.tarief.soort === "uur" ? `${p.uren} uur × ${euro(p.tarief.bedrag)}` : "vaste prijs"}</p></div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${s === "verzonden" ? "bg-slate-200 text-slate-700" : s === "goedgekeurd" ? "bg-green-100 text-green-700" : s === "credit" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}>{s === "concept" ? "Concept" : s === "goedgekeurd" ? "Goedgekeurd" : s === "credit" ? "Creditfactuur" : "Verzonden"}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-sm"><div><p className="text-slate-500">Excl. btw</p><b>{euro(ex)}</b></div><div><p className="text-slate-500">Btw 21%</p><b>{euro(ex * 0.21)}</b></div><div><p className="text-slate-500">Totaal</p><b>{euro(ex * 1.21)}</b></div></div>
            {nummer[p.id] && <p className="mt-2 text-xs text-slate-500">Factuurnummer {nummer[p.id]} · vergrendeld, wijzigen kan alleen met een creditfactuur</p>}
            <div className="mt-3 flex flex-wrap gap-2">
              {s === "concept" && <button className={blauw} onClick={() => setStatus({ ...status, [p.id]: "goedgekeurd" })}><Check className="mr-1 inline size-4" />Goedkeuren</button>}
              {s === "goedgekeurd" && <button className={blauw} onClick={() => verstuur(p)}>Versturen per e-mail</button>}
              {s === "verzonden" && <button className={grijs} onClick={() => { setStatus({ ...status, [p.id]: "credit" }); toon("Creditfactuur gemaakt"); }}>Creditfactuur maken</button>}
              <button className={grijs} onClick={() => toon("Pdf geopend (voorbeeld)")}><Download className="mr-1 inline size-4" />Pdf</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Geschiedenis({ bonnen, toon }: { bonnen: Bon[]; toon: (t: string) => void }) {
  const [q, setQ] = useState("");
  const lijst = bonnen.filter((b) => `${b.monteur} ${b.project} ${b.dag} week ${b.week} ${b.opmerking}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Zoek op monteur, project, opdrachtgever of week (bijv. week 33)" className="min-w-64 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm" />
        <button className={grijs} onClick={() => toon("Excel gemaakt (voorbeeld)")}><Download className="mr-1 inline size-4" />Excel</button>
        <button className={grijs} onClick={() => toon("Pdf gemaakt (voorbeeld)")}><Download className="mr-1 inline size-4" />Pdf</button>
      </div>
      <div className={`${kaart} divide-y divide-slate-100`}>
        {lijst.map((b) => (
          <div key={b.id} className="flex flex-wrap items-center justify-between gap-2 p-3 text-sm">
            <div><p className="font-semibold">{b.project}</p><p className="text-slate-500">Week {b.week} · {b.dag} · {b.monteur}{b.opmerking ? ` · ${b.opmerking}` : ""}</p></div>
            <span className="flex items-center gap-2 font-bold">{uren(b)} uur {b.vergrendeld && <Lock className="size-4 text-slate-400" />}</span>
          </div>
        ))}
        {lijst.length === 0 && <p className="p-6 text-center text-slate-400">Niets gevonden.</p>}
      </div>
    </div>
  );
}

function Monteurs({ toon }: { toon: (t: string) => void }) {
  const [lijst, setLijst] = useState(MONTEURS.map((m) => ({ naam: m, mail: m.split(" ")[0].toLowerCase() + "@voorbeeld.nl" })));
  const [mail, setMail] = useState("");
  return (
    <div className="space-y-4">
      <div className={`${kaart} flex flex-wrap gap-2 p-4`}>
        <input value={mail} onChange={(e) => setMail(e.target.value)} placeholder="E-mailadres van de monteur" className="min-w-64 flex-1 rounded-xl border border-slate-300 px-3 py-2.5 text-sm" />
        <button className={blauw} onClick={() => { if (!mail.includes("@")) return; setLijst([...lijst, { naam: mail.split("@")[0], mail }]); setMail(""); toon("Uitnodiging verstuurd"); }}>Uitnodigen</button>
      </div>
      <div className={`${kaart} divide-y divide-slate-100`}>
        {lijst.map((m) => (
          <div key={m.mail} className="flex items-center justify-between gap-2 p-4 text-sm">
            <div><p className="font-semibold">{m.naam}</p><p className="text-slate-500">{m.mail}</p></div>
            <button className="rounded-lg p-2 text-red-600 hover:bg-red-50" aria-label="Verwijderen" onClick={() => { setLijst(lijst.filter((x) => x.mail !== m.mail)); toon("Monteur verwijderd"); }}><Trash2 className="size-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

const stKleur = { geldig: "bg-green-100 text-green-700", bijna: "bg-amber-100 text-amber-700", verlopen: "bg-red-100 text-red-700", ontbreekt: "bg-slate-100 text-slate-500" } as const;
const stTekst = { geldig: "Geldig", bijna: "Bijna verlopen", verlopen: "Verlopen", ontbreekt: "Ontbreekt" } as const;

function Certificaten({ toon }: { toon: (t: string) => void }) {
  const problemen = CERTS.filter((c) => certStatus(c) === "verlopen" || certStatus(c) === "bijna");
  const deel = (id: string) => {
    const url = `${window.location.origin}/deel/${id}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    toon("Link gekopieerd: " + url);
  };
  return (
    <div className="space-y-5">
      {problemen.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <b>Let op:</b> {problemen.map((c) => `${c.monteur} (${c.soort}, ${certStatus(c) === "verlopen" ? "verlopen" : "verloopt " + datumNL(c.verloopt)})`).join(" · ")}
        </div>
      )}
      <div className={`${kaart} overflow-x-auto`}>
        <h2 className="border-b border-slate-100 p-4 font-bold">Certificaten per monteur</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500"><tr><th className="p-3">Monteur</th>{CERT_SOORTEN.map((s) => <th key={s} className="p-3">{s}</th>)}</tr></thead>
          <tbody>
            {MONTEURS.map((m) => (
              <tr key={m} className="border-t border-slate-50">
                <td className="p-3 font-semibold">{m}</td>
                {CERT_SOORTEN.map((s) => {
                  const c = certVan(m, s);
                  const st = certStatus(c);
                  return <td key={s} className="p-3"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${stKleur[st]}`}>{stTekst[st]}</span>{c && <p className="mt-1 text-xs text-slate-500">tot {datumNL(c.verloopt)}</p>}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-slate-100 p-3"><button className={grijs} onClick={() => toon("Certificaat uploaden (voorbeeld)")}><Plus className="mr-1 inline size-4" />Certificaat toevoegen</button></div>
      </div>
      <div className={kaart}>
        <h2 className="border-b border-slate-100 p-4 font-bold">Controle bij projectstart en delen</h2>
        {PROJECTEN.filter((p) => p.kolom !== "Gefactureerd").map((p) => {
          const eisen = VEREIST[p.id] ?? [];
          const team = TEAM[p.id] ?? [];
          const fout = team.flatMap((m) => eisen.filter((s) => { const st = certStatus(certVan(m, s)); return st === "verlopen" || st === "ontbreekt"; }).map((s) => `${m}: ${s}`));
          return (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 text-sm last:border-0">
              <div className="min-w-0">
                <p className="font-bold">{p.naam}</p>
                <p className="text-slate-500">Vereist: {eisen.join(", ")} · Team: {team.join(", ")}</p>
                {fout.length === 0 ? <p className="mt-1 font-semibold text-green-700">Alles in orde: team is gecertificeerd.</p> : <p className="mt-1 font-semibold text-red-700">Niet in orde: {fout.join(" · ")}</p>}
              </div>
              <div className="flex gap-2"><a href={`/deel/${p.id}`} target="_blank" className={grijs}>Bekijken</a><button className={blauw} onClick={() => deel(p.id)}>Delen</button></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ Startscherm ------------------------------ */
function Inloggen({ kies }: { kies: (r: "monteur" | "beheer") => void }) {
  const [taal, setTaal] = useState<Taal>("nl");
  const w = taal === "nl"
    ? { sub: "Uren, werkbonnen en facturen op één plek.", vraag: "Wie ben je?", beheer: "Ik ben beheerder", beheerSub: "Overzicht, bord, facturen, certificaten", monteur: "Ik ben monteur", monteurSub: "Inchecken, uitchecken en mijn uren", voorbeeld: "Dit is een voorbeeld: klik op een knop om te beginnen." }
    : { sub: "Godziny, karty pracy i faktury w jednym miejscu.", vraag: "Kim jesteś?", beheer: "Jestem administratorem", beheerSub: "Przegląd, tablica, faktury, certyfikaty", monteur: "Jestem monterem", monteurSub: "Rozpocznij pracę, zakończ pracę i moje godziny", voorbeeld: "To jest przykład: kliknij przycisk, aby zacząć." };
  return (
    <div className="grid min-h-screen place-items-center px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <span className="grid size-12 place-items-center rounded-2xl bg-blue-600 text-white"><Clock className="size-6" /></span>
            <h1 className="mt-4 text-3xl font-bold">Werkbonnen</h1>
            <p className="mt-1 text-slate-600">{w.sub}</p>
          </div>
          <div className="flex rounded-lg bg-slate-200 p-0.5 text-xs font-bold">
            {(["nl", "pl"] as const).map((k) => <button key={k} onClick={() => setTaal(k)} className={`rounded-md px-3 py-1 uppercase ${taal === k ? "bg-white shadow-sm" : "text-slate-500"}`}>{k}</button>)}
          </div>
        </div>
        <p className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">{w.vraag}</p>
        <div className="space-y-3">
          <button onClick={() => kies("beheer")} className="flex w-full items-center gap-4 rounded-2xl bg-blue-600 p-5 text-left text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]">
            <LayoutDashboard className="size-8 shrink-0" />
            <span><span className="block text-xl font-bold">{w.beheer}</span><span className="text-sm text-blue-100">{w.beheerSub}</span></span>
          </button>
          <button onClick={() => kies("monteur")} className="flex w-full items-center gap-4 rounded-2xl bg-green-600 p-5 text-left text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98]">
            <Play className="size-8 shrink-0" />
            <span><span className="block text-xl font-bold">{w.monteur}</span><span className="text-sm text-green-100">{w.monteurSub}</span></span>
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">{w.voorbeeld}</p>
      </div>
    </div>
  );
}

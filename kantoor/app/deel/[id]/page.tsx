import { CERTS, PROJECTEN, TEAM, VEREIST, certStatus, certVan, datumNL } from "../../data";

const kleur = { geldig: "bg-green-100 text-green-700", bijna: "bg-amber-100 text-amber-700", verlopen: "bg-red-100 text-red-700", ontbreekt: "bg-red-100 text-red-700" } as const;
const tekst = { geldig: "Geldig", bijna: "Bijna verlopen", verlopen: "Verlopen", ontbreekt: "Ontbreekt" } as const;

/** Deelbare pagina voor de opdrachtgever: wie werkt op het project en welke certificaten zijn geldig. */
export default async function Deel({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = PROJECTEN.find((x) => x.id === id);
  if (!p) return <main className="p-10 text-center">Project niet gevonden.</main>;
  const team = TEAM[id] ?? [];
  const eisen = VEREIST[id] ?? [];
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Certificaten bij projectstart</p>
      <h1 className="mt-1 text-2xl font-bold">{p.naam}</h1>
      <p className="text-slate-600">Opdrachtgever: {p.klant}</p>
      <p className="mt-1 text-sm text-slate-500">Vereist: {eisen.join(", ")} · Gecontroleerd op {datumNL("2026-11-24")}</p>
      <div className="mt-6 space-y-4">
        {team.map((m) => (
          <section key={m} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="font-bold">{m}</h2>
            <div className="mt-2 divide-y divide-slate-100 text-sm">
              {eisen.map((s) => {
                const c = certVan(m, s);
                const st = certStatus(c);
                return (
                  <div key={s} className="flex items-center justify-between gap-2 py-2">
                    <div><p className="font-semibold">{s}</p><p className="text-slate-500">{c ? `Nr. ${c.nummer} · geldig tot ${datumNL(c.verloopt)}` : "Geen certificaat gevonden"}</p></div>
                    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${kleur[st]}`}>{tekst[st]}</span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-slate-400">{CERTS.length} certificaten in het systeem · deze pagina is een voorbeeld</p>
    </main>
  );
}

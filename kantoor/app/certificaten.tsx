"use client";
import { useEffect, useState } from "react";
import { Copy, ExternalLink, FileText, Trash2, Upload } from "lucide-react";

/*
 * Certificaten van de monteurs (voorbeeld). De monteur uploadt zelf een foto of pdf met de verloopdatum;
 * Bart ziet ze allemaal en deelt één link met opdrachtgevers. Opslag: alleen in deze browser.
 */

export type Cert = { id: string; monteur: string; soort: string; verloopt: string; bestand: string; bestandNaam: string };
export const SOORTEN = ["VCA Basis", "VCA VOL", "Werken op hoogte", "Glasdrager", "Hoogwerker", "BHV", "Anders"];
const SLEUTEL = "bm-certificaten";

export function useCerts() {
  const [certs, setCerts] = useState<Cert[]>([]);
  useEffect(() => {
    try {
      const s = localStorage.getItem(SLEUTEL);
      setCerts(s ? JSON.parse(s) : [
        { id: "v1", monteur: "Piotr", soort: "VCA Basis", verloopt: "2034-03-12", bestand: "", bestandNaam: "" },
        { id: "v2", monteur: "Piotr", soort: "Werken op hoogte", verloopt: "2026-12-15", bestand: "", bestandNaam: "" },
        { id: "v3", monteur: "Marek", soort: "VCA Basis", verloopt: "2033-06-01", bestand: "", bestandNaam: "" },
        { id: "v4", monteur: "Marek", soort: "Glasdrager", verloopt: "2026-02-10", bestand: "", bestandNaam: "" },
      ]);
    } catch {}
  }, []);
  const zet = (n: Cert[]) => {
    setCerts(n);
    try { localStorage.setItem(SLEUTEL, JSON.stringify(n)); } catch {}
  };
  return { certs, zet };
}

/** Geldig, verloopt binnen 2 maanden, of verlopen. */
export function status(verloopt: string): { tekst: string; tekstPl: string; kleur: string } {
  const dagen = (new Date(verloopt).getTime() - Date.now()) / 86400000;
  if (dagen < 0) return { tekst: "Verlopen", tekstPl: "Wygasł", kleur: "bg-red-100 text-red-800" };
  if (dagen < 60) return { tekst: "Verloopt binnenkort", tekstPl: "Wkrótce wygasa", kleur: "bg-amber-100 text-amber-800" };
  return { tekst: "Geldig", tekstPl: "Ważny", kleur: "bg-green-100 text-green-800" };
}
const datum = (d: string, pl = false) => new Date(d).toLocaleDateString(pl ? "pl-PL" : "nl-NL", { day: "numeric", month: "long", year: "numeric" });

/* ---------- de monteur: eigen certificaten uploaden ---------- */
export function MijnCertificaten({ naam, pl }: { naam: string; pl: boolean }) {
  const { certs, zet } = useCerts();
  const mijn = certs.filter((c) => c.monteur === naam);
  const [soort, setSoort] = useState(SOORTEN[0]);
  const [verloopt, setVerloopt] = useState("");
  const [bestand, setBestand] = useState<{ data: string; naam: string } | null>(null);
  const [fout, setFout] = useState("");
  const L = pl
    ? { kop: "Moje certyfikaty", nieuw: "Dodaj certyfikat", soort: "Rodzaj", geldig: "Ważny do", foto: "Zdjęcie lub PDF", kies: "Zrób zdjęcie lub wybierz plik", op: "Zapisz", leeg: "Brak certyfikatów.", fout: "Wybierz datę i plik.", groot: "Plik jest za duży (maks. 2 MB w tym przykładzie)." }
    : { kop: "Mijn certificaten", nieuw: "Certificaat toevoegen", soort: "Soort", geldig: "Geldig tot", foto: "Foto of pdf", kies: "Maak een foto of kies een bestand", op: "Opslaan", leeg: "Nog geen certificaten.", fout: "Kies een datum en een bestand.", groot: "Het bestand is te groot (max. 2 MB in dit voorbeeld)." };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">{L.kop}</h2>
      {mijn.length === 0 && <p className="text-slate-500">{L.leeg}</p>}
      {mijn.map((c) => {
        const s = status(c.verloopt);
        return (
          <div key={c.id} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
            <FileText className="size-6 shrink-0 text-[#1E5079]" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{c.soort}</p>
              <p className="text-sm text-slate-600">{L.geldig} {datum(c.verloopt, pl)}</p>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${s.kleur}`}>{pl ? s.tekstPl : s.tekst}</span>
            </div>
            {c.bestand && <a href={c.bestand} target="_blank" rel="noopener" className="text-sm font-semibold text-[#1E5079]">{pl ? "Pokaż" : "Bekijk"}</a>}
            <button onClick={() => zet(certs.filter((x) => x.id !== c.id))} aria-label="Verwijderen" className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="size-5" /></button>
          </div>
        );
      })}

      <form
        className="space-y-3 rounded-2xl border-2 border-dashed border-slate-300 bg-white p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!verloopt || !bestand) return setFout(L.fout);
          zet([...certs, { id: String(Date.now()), monteur: naam, soort, verloopt, bestand: bestand.data, bestandNaam: bestand.naam }]);
          setVerloopt(""); setBestand(null); setFout("");
        }}>
        <p className="font-bold">{L.nieuw}</p>
        <label className="block text-sm font-semibold">{L.soort}
          <select value={soort} onChange={(e) => setSoort(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white p-3 text-base font-normal">
            {SOORTEN.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="block text-sm font-semibold">{L.geldig}
          <input type="date" value={verloopt} onChange={(e) => setVerloopt(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 p-3 text-base font-normal" />
        </label>
        <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-100 p-4 text-sm font-semibold text-slate-700">
          <Upload className="size-5" /> {bestand ? bestand.naam : L.kies}
          <input type="file" accept="image/*,application/pdf" capture="environment" className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (f.size > 2_000_000) return setFout(L.groot);
              const r = new FileReader();
              r.onload = () => setBestand({ data: String(r.result), naam: f.name });
              r.readAsDataURL(f);
            }} />
        </label>
        {fout && <p className="text-sm text-red-600">{fout}</p>}
        <button className="w-full rounded-xl bg-[#1E5079] p-3 font-bold text-white">{L.op}</button>
      </form>
    </div>
  );
}

/* ---------- Bart: alle certificaten en de deellink ---------- */
export function CertificatenKantoor({ monteurs }: { monteurs: string[] }) {
  const { certs } = useCerts();
  const [gekopieerd, setGekopieerd] = useState(false);
  const link = typeof window !== "undefined" ? `${window.location.origin}/deel` : "/deel";
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
        <div className="min-w-0 flex-1">
          <p className="font-bold">Link voor opdrachtgevers</p>
          <p className="truncate text-sm text-slate-600">{link}</p>
        </div>
        <button onClick={() => { navigator.clipboard?.writeText(link); setGekopieerd(true); setTimeout(() => setGekopieerd(false), 2000); }} className="flex items-center gap-1 rounded-xl bg-[#1E5079] px-4 py-2 text-sm font-bold text-white"><Copy className="size-4" /> {gekopieerd ? "Gekopieerd" : "Kopieer link"}</button>
        <a href="/deel" target="_blank" className="flex items-center gap-1 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"><ExternalLink className="size-4" /> Bekijk zoals de opdrachtgever</a>
      </div>
      <CertLijst certs={certs} monteurs={monteurs} />
    </div>
  );
}

export function CertLijst({ certs, monteurs }: { certs: Cert[]; monteurs: string[] }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {monteurs.map((m) => {
        const van = certs.filter((c) => c.monteur === m);
        return (
          <div key={m} className="border-b border-slate-100 p-4 last:border-0">
            <p className="font-bold">{m}</p>
            {van.length === 0 ? <p className="text-sm text-slate-500">Geen certificaten</p> : (
              <ul className="mt-1 space-y-1">
                {van.map((c) => {
                  const s = status(c.verloopt);
                  return (
                    <li key={c.id} className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-medium">{c.soort}</span>
                      <span className="text-slate-500">tot {datum(c.verloopt)}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.kleur}`}>{s.tekst}</span>
                      {c.bestand && <a href={c.bestand} target="_blank" rel="noopener" className="font-semibold text-[#1E5079]">Bekijk</a>}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

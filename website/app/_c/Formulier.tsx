"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const veld = "mt-2 block h-[49px] w-full border border-white/25 bg-navy px-4 text-[16px] text-white outline-none transition focus:border-[#1fb3e7]";
const label = "block text-[16px] font-semibold leading-[24px] text-white";

/** Contactformulier: verstuurt naar /api/contact en gaat daarna naar de bedankpagina. */
export type FormulierTeksten = { naamEnAchternaam: string; naam: string; achternaam: string; email: string; telefoon: string; telefoonHint: string; bericht: string; bezig: string; verstuur: string; mislukt: string; taal: string; bedankt: string };

export function Formulier({ l }: { l: FormulierTeksten }) {
  const router = useRouter();
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState("");

  async function verstuur(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBezig(true);
    setFout("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/contact/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...data, taal: l.taal }) });
      const j = (await r.json().catch(() => ({}))) as { fout?: string };
      if (!r.ok) throw new Error(j.fout || l.mislukt);
      router.push(l.bedankt);
    } catch (err) {
      setFout(err instanceof Error ? err.message : l.mislukt);
      setBezig(false);
    }
  }

  return (
    <form onSubmit={verstuur} className="space-y-6 bg-white/5 p-6 md:p-[35px]" noValidate={false}>
      <div>
        <p className={label}>{l.naamEnAchternaam}<span aria-hidden> *</span></p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label><input name="voornaam" required autoComplete="given-name" className={veld} /><span className="mt-1 block text-[13px] text-white/70">{l.naam}</span></label>
          <label><input name="achternaam" required autoComplete="family-name" className={veld} /><span className="mt-1 block text-[13px] text-white/70">{l.achternaam}</span></label>
        </div>
      </div>
      <label className="block">
        <span className={label}>{l.email}<span aria-hidden> *</span></span>
        <input type="email" name="email" required autoComplete="email" className={veld} />
        <span className="mt-1 block text-[13px] text-white/70">exemple@exemple.com</span>
      </label>
      <label className="block">
        <span className={label}>{l.telefoon}<span aria-hidden> *</span></span>
        <input type="tel" name="telefoon" required autoComplete="tel" placeholder="00 00 00 00 00" pattern="[0-9 +()\-]{8,}" title={l.telefoonHint} className={veld} />
        <span className="mt-1 block text-[13px] text-white/70">{l.telefoonHint}</span>
      </label>
      <label className="block">
        <span className={label}>{l.bericht}<span aria-hidden> *</span></span>
        <textarea name="bericht" required rows={6} className={`${veld} h-[150px] py-3`} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {fout && <p role="alert" className="bg-oranje/20 px-4 py-3 text-[16px] text-white">{fout}</p>}
      <button type="submit" disabled={bezig} className="h-[50px] w-full bg-blauw text-[14px] font-bold uppercase tracking-[1.6px] text-white transition hover:bg-[#1fb3e7] disabled:opacity-60">
        {bezig ? l.bezig : l.verstuur}
      </button>
    </form>
  );
}

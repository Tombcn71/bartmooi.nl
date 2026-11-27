"use client";
import { CertLijst, useCerts } from "../certificaten";

/** Wat een opdrachtgever ziet via de deellink: alleen de certificaten van de monteurs, niets anders. */
export default function Deel() {
  const { certs } = useCerts();
  const monteurs = Array.from(new Set(certs.map((c) => c.monteur)));
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-4 md:p-8">
      <div>
        <p className="text-sm font-semibold text-[#1E5079]">BartMooi B.V.</p>
        <h1 className="text-2xl font-bold">Certificaten van onze monteurs</h1>
        <p className="mt-1 text-sm text-slate-600">Bijgewerkt op {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}.</p>
      </div>
      <CertLijst certs={certs} monteurs={monteurs} />
    </main>
  );
}

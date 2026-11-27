export type Kolom = "Gepland" | "Bezig" | "Klaar om te factureren" | "Gefactureerd";
export const KOLOMMEN: Kolom[] = ["Gepland", "Bezig", "Klaar om te factureren", "Gefactureerd"];

export type Project = { id: string; naam: string; klant: string; tarief: { soort: "uur" | "vast"; bedrag: number }; kolom: Kolom; uren: number; werkt: string[] };
export const PROJECTEN: Project[] = [
  { id: "p1", naam: "Kozijnen Laan van Meerdervoort 12", klant: "Van Dijk Bouw", tarief: { soort: "uur", bedrag: 48 }, kolom: "Bezig", uren: 26.5, werkt: ["Piotr Kowalski", "Marek Nowak"] },
  { id: "p2", naam: "Schuifpui Wassenaarseweg 88", klant: "Familie De Wit", tarief: { soort: "vast", bedrag: 2850 }, kolom: "Bezig", uren: 14, werkt: ["Tomasz Zielinski"] },
  { id: "p3", naam: "Voordeur Scheveningseweg 5", klant: "Bakker Vastgoed", tarief: { soort: "uur", bedrag: 48 }, kolom: "Gepland", uren: 0, werkt: [] },
  { id: "p4", naam: "Rolluiken Zeestraat 31", klant: "Familie Jansen", tarief: { soort: "vast", bedrag: 1920 }, kolom: "Klaar om te factureren", uren: 18.5, werkt: [] },
  { id: "p5", naam: "Kozijnen Hoefkade 140", klant: "Van Dijk Bouw", tarief: { soort: "uur", bedrag: 48 }, kolom: "Klaar om te factureren", uren: 41, werkt: [] },
  { id: "p6", naam: "Horren Bezuidenhout 9", klant: "Familie Smit", tarief: { soort: "uur", bedrag: 48 }, kolom: "Gefactureerd", uren: 9, werkt: [] },
];

export const MONTEURS = ["Piotr Kowalski", "Marek Nowak", "Tomasz Zielinski", "Kamil Wójcik"];
export type Bon = { id: string; monteur: string; project: string; dag: string; week: number; start: string; eind: string; pauze: number; opmerking: string; vergrendeld: boolean };
export const BONNEN: Bon[] = [
  { id: "b1", monteur: "Piotr Kowalski", project: "Kozijnen Laan van Meerdervoort 12", dag: "ma 23 nov", week: 48, start: "07:30", eind: "16:00", pauze: 30, opmerking: "Oude kozijnen eruit", vergrendeld: false },
  { id: "b2", monteur: "Marek Nowak", project: "Kozijnen Laan van Meerdervoort 12", dag: "ma 23 nov", week: 48, start: "07:30", eind: "16:00", pauze: 30, opmerking: "", vergrendeld: false },
  { id: "b3", monteur: "Tomasz Zielinski", project: "Schuifpui Wassenaarseweg 88", dag: "ma 23 nov", week: 48, start: "08:00", eind: "15:30", pauze: 30, opmerking: "Rails gemonteerd", vergrendeld: false },
  { id: "b4", monteur: "Piotr Kowalski", project: "Kozijnen Laan van Meerdervoort 12", dag: "vr 20 nov", week: 47, start: "07:30", eind: "16:30", pauze: 45, opmerking: "", vergrendeld: true },
  { id: "b5", monteur: "Kamil Wójcik", project: "Rolluiken Zeestraat 31", dag: "do 19 nov", week: 47, start: "08:00", eind: "16:00", pauze: 30, opmerking: "Afgerond", vergrendeld: true },
  { id: "b6", monteur: "Marek Nowak", project: "Kozijnen Hoefkade 140", dag: "wo 18 nov", week: 47, start: "07:30", eind: "17:00", pauze: 30, opmerking: "Laatste dag", vergrendeld: true },
  { id: "b7", monteur: "Piotr Kowalski", project: "Horren Bezuidenhout 9", dag: "di 18 aug", week: 33, start: "08:00", eind: "12:00", pauze: 0, opmerking: "Vorig jaar", vergrendeld: true },
];
export const uren = (b: Bon) => {
  const [h1, m1] = b.start.split(":").map(Number);
  const [h2, m2] = b.eind.split(":").map(Number);
  return Math.round(((h2 * 60 + m2 - (h1 * 60 + m1) - b.pauze) / 60) * 100) / 100;
};
export const euro = (n: number) => `€ ${n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------------------------- Certificaten ---------------------------- */
export const VANDAAG = "2026-11-24";
export type Cert = { monteur: string; soort: string; nummer: string; uitgifte: string; verloopt: string };
export const CERTS: Cert[] = [
  { monteur: "Piotr Kowalski", soort: "VCA Basis", nummer: "VCA-882140", uitgifte: "2024-03-12", verloopt: "2034-03-12" },
  { monteur: "Piotr Kowalski", soort: "Glasdrager", nummer: "GD-5521", uitgifte: "2025-01-20", verloopt: "2027-01-20" },
  { monteur: "Piotr Kowalski", soort: "Werken op hoogte", nummer: "WOH-3310", uitgifte: "2024-12-15", verloopt: "2026-12-15" },
  { monteur: "Marek Nowak", soort: "VCA Basis", nummer: "VCA-771903", uitgifte: "2023-06-01", verloopt: "2033-06-01" },
  { monteur: "Marek Nowak", soort: "Glasdrager", nummer: "GD-4410", uitgifte: "2024-02-10", verloopt: "2026-02-10" },
  { monteur: "Tomasz Zielinski", soort: "VCA Basis", nummer: "VCA-903311", uitgifte: "2025-05-05", verloopt: "2035-05-05" },
  { monteur: "Tomasz Zielinski", soort: "Glasdrager", nummer: "GD-6120", uitgifte: "2025-08-22", verloopt: "2027-08-22" },
  { monteur: "Tomasz Zielinski", soort: "Werken op hoogte", nummer: "WOH-4470", uitgifte: "2025-09-01", verloopt: "2027-09-01" },
  { monteur: "Kamil Wójcik", soort: "VCA Basis", nummer: "VCA-660218", uitgifte: "2022-10-10", verloopt: "2032-10-10" },
];
export type CertStatus = "geldig" | "bijna" | "verlopen" | "ontbreekt";
export const certStatus = (c?: Cert): CertStatus => {
  if (!c) return "ontbreekt";
  if (c.verloopt < VANDAAG) return "verlopen";
  const d = (new Date(c.verloopt).getTime() - new Date(VANDAAG).getTime()) / 86400000;
  return d <= 60 ? "bijna" : "geldig";
};
export const CERT_SOORTEN = ["VCA Basis", "Glasdrager", "Werken op hoogte"];
/** Welke certificaten een project vereist, en wie er op het team staat. */
export const VEREIST: Record<string, string[]> = {
  p1: ["VCA Basis", "Glasdrager"], p2: ["VCA Basis", "Glasdrager", "Werken op hoogte"], p3: ["VCA Basis"],
  p4: ["VCA Basis"], p5: ["VCA Basis", "Glasdrager"], p6: ["VCA Basis"],
};
export const TEAM: Record<string, string[]> = {
  p1: ["Piotr Kowalski", "Marek Nowak"], p2: ["Tomasz Zielinski"], p3: ["Kamil Wójcik", "Marek Nowak"],
  p4: ["Kamil Wójcik"], p5: ["Marek Nowak", "Piotr Kowalski"], p6: ["Piotr Kowalski"],
};
export const certVan = (m: string, soort: string) => CERTS.find((c) => c.monteur === m && c.soort === soort);
export const datumNL = (iso: string) => new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });

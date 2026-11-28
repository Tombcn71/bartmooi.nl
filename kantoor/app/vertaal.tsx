"use client";
import { useEffect, useRef, type ReactNode } from "react";

/* Kantoor van Bart in het Pools: alle vaste teksten worden vertaald, ingevulde dingen (namen, projecten, opdrachten) blijven zoals ze zijn. */
const PL: Record<string, string> = {
  "Adres, bijv. Kerkstraat 5": "Adres, np. Kerkstraat 5",
  "Bedrijfsgegevens": "Dane firmy",
  "Bedrijfsnaam": "Nazwa firmy",
  "Begindatum": "Data rozpoczęcia",
  "Bekijk als monteur": "Zobacz jako monter",
  "Bekijk zoals de opdrachtgever": "Zobacz jak zleceniodawca",
  "Betaal je monteurs": "Płacisz monterom",
  "Betaald": "Zapłacone",
  "Betalen": "Zapłać",
  "Betalen aan monteurs": "Płatności dla monterów",
  "Bezig": "W toku",
  "Bijv. 3 kozijnen plaatsen achterkant, sleutel bij de buren.": "Np. 3 okna z tyłu, klucz u sąsiadów.",
  "Bijv. 4500": "Np. 4500",
  "Btw verlegd (onderaanneming).": "Odwrotne obciążenie VAT (podwykonawstwo).",
  "Btw-nummer": "Numer VAT",
  "Certificaten": "Certyfikaty",
  "Download als PDF": "Pobierz PDF",
  "Een nieuw project staat meteen in het planbord en bij de monteurs in de lijst.": "Nowy projekt od razu pojawia się w planie i na liście monterów.",
  "Einddatum": "Data zakończenia",
  "Factureer je": "Fakturujesz",
  "Factureer je = de prijs die je de opdrachtgever rekent (in te stellen bij Projecten). Betaal je monteurs = goedgekeurde uren × hun uurloon.": "Fakturujesz = cena dla zleceniodawcy (ustawiana w Projektach). Płacisz monterom = zatwierdzone godziny × ich stawka.",
  "Factureer je aan opdrachtgevers": "Fakturujesz zleceniodawcom",
  "Facturen": "Faktury",
  "Facturen van monteurs open": "Otwarte faktury monterów",
  "Factureren aan opdrachtgevers": "Fakturowanie zleceniodawców",
  "Factuur": "Faktura",
  "Geen certificaten": "Brak certyfikatów",
  "Geen telefoonnummer": "Brak numeru telefonu",
  "geen bedrijf": "brak firmy",
  "Geldig": "Ważny",
  "Goedgekeurd": "Zatwierdzone",
  "Goedkeuren": "Zatwierdź",
  "Hele week (ma t/m vr) hetzelfde": "Cały tydzień (pon–pt) tak samo",
  "Home": "Start",
  "Houd je over": "Zostaje ci",
  "Iemand toevoegen": "Dodaj osobę",
  "Ingestuurd": "Wysłane",
  "Ja, weghalen": "Tak, usuń",
  "Klaar": "Gotowe",
  "Klant, bijv. Familie Bakker": "Klient, np. rodzina Bakker",
  "Kopieer link": "Kopiuj link",
  "Kost je aan monteurs": "Kosztują cię monterzy",
  "KvK-nummer": "Numer KvK",
  "Leeg": "Puste",
  "Link voor opdrachtgevers": "Link dla zleceniodawców",
  "Moet je nog betalen aan monteurs": "Musisz jeszcze zapłacić monterom",
  "Monteur": "Monter",
  "Naam": "Imię",
  "Nee": "Nie",
  "Nog geen facturen. Ze komen vanzelf zodra je bij Uren een week goedkeurt.": "Brak faktur. Pojawią się same, gdy zatwierdzisz tydzień w Godzinach.",
  "Nog geen projecten.": "Brak projektów.",
  "Nog niemand in het team.": "Nikogo jeszcze nie ma w zespole.",
  "Nog niets ingevuld.": "Jeszcze nic nie wpisano.",
  "Omschrijving toevoegen": "Dodaj opis",
  "Opdracht": "Zadanie",
  "Opslaan": "Zapisz",
  "Oranje = staat die dag al ergens anders; aantikken verplaatst hem hierheen.": "Pomarańczowy = tego dnia jest już gdzie indziej; dotknięcie przeniesie go tutaj.",
  "Planning": "Planowanie",
  "Prijs": "Cena",
  "Prijs voor de opdrachtgever (€, excl. btw)": "Cena dla zleceniodawcy (€, bez VAT)",
  "Project": "Projekt",
  "Project / opdrachtgever": "Projekt / zleceniodawca",
  "Project toevoegen": "Dodaj projekt",
  "Projecten": "Projekty",
  "Sluiten": "Zamknij",
  "Straks krijgt een nieuwe monteur een sms met zijn eigen link naar de app.": "Nowy monter dostanie wiadomość z własnym linkiem do aplikacji.",
  "Stuur link en pincode via WhatsApp": "Wyślij link i PIN przez WhatsApp",
  "Taal van het bericht": "Język wiadomości",
  "Team": "Zespół",
  "Telefoonnummer": "Numer telefonu",
  "Terug": "Wstecz",
  "Tik op een monteur voor de details per dag.": "Dotknij montera, aby zobaczyć szczegóły dnia.",
  "Tik op een vak om monteurs en een opdracht in te plannen. De monteur ziet het meteen op zijn telefoon.": "Dotknij pola, aby zaplanować monterów i zadanie. Monter od razu widzi to w telefonie.",
  "Toevoegen": "Dodaj",
  "Totaal": "Razem",
  "Uren": "Godziny",
  "Uren van de monteurs": "Godziny monterów",
  "Uurloon (€ per uur)": "Stawka (€ za godzinę)",
  "Uurtarief (€)": "Stawka godzinowa (€)",
  "Verloopt binnenkort": "Wkrótce wygasa",
  "Verlopen": "Wygasł",
  "Volgende week": "Następny tydzień",
  "Vooruit": "Dalej",
  "Vorige week": "Poprzedni tydzień",
  "Wat voor project en wat moet er gebeuren? Bijv. 4 kunststof kozijnen vervangen achterkant.": "Jaki projekt i co trzeba zrobić? Np. wymiana 4 okien PCV z tyłu.",
  "Week": "Tydzień",
  "Weghalen": "Usuń",
  "Wie gaat erheen?": "Kto jedzie?",
  "monteurs aan het werk vandaag": "monterzy dziś w pracy",
  "monteurs aan het werk op maandag": "monterzy w pracy w poniedziałek",
  "lopende klussen vandaag": "trwające prace dziś",
  "lopende klussen op maandag": "trwające prace w poniedziałek",
  "niet ingepland": "niezaplanowani",
  "projecten die aandacht nodig hebben": "projekty wymagające uwagi",
  "toon weer alle projecten": "pokaż wszystkie projekty",
  "einddatum voorbij": "termin minął",
  "tot": "do",
  "uur ·": "godz. ·",
  "· pincode": "· PIN",
  "· week": "· tydzień",
  "← Andere persoon": "← Inna osoba",
  "Ma": "Pn", "Di": "Wt", "Wo": "Śr", "Do": "Cz", "Vr": "Pt", "Za": "So", "Zo": "Nd",
  "ma": "pn", "di": "wt", "wo": "śr", "do": "cz", "vr": "pt", "za": "so", "zo": "nd",
  "Maandag": "Poniedziałek", "Dinsdag": "Wtorek", "Woensdag": "Środa", "Donderdag": "Czwartek", "Vrijdag": "Piątek", "Zaterdag": "Sobota", "Zondag": "Niedziela",
};
const dagen = (n: string) => (n === "1" ? "dzień" : "dni");
const REGELS: [RegExp, (...m: string[]) => string][] = [
  [/^budget (\d+)% op, nog (\d+) dagen? ingepland$/, (_, a, b) => `budżet wykorzystany w ${a}%, zaplanowano jeszcze ${b} ${dagen(b)}`],
  [/^budget (\d+)% op$/, (_, a) => `budżet wykorzystany w ${a}%`],
  [/^(\d+) dagen? over einddatum$/, (_, a) => `${a} ${dagen(a)} po terminie`],
  [/^kosten straks (\d+)% van de prijs$/, (_, a) => `koszty wyniosą ${a}% ceny`],
  [/^Staat al bij (.+)$/, (_, a) => `Już jest u: ${a}`],
  [/^Week (\d+)(.*)$/, (_, a, b) => `Tydzień ${a}${b}`],
  [/^Bijv\. (\d+)$/, (_, a) => `Np. ${a}`],
];

const MAAND: Record<string, string> = { januari: "stycznia", februari: "lutego", maart: "marca", april: "kwietnia", mei: "maja", juni: "czerwca", juli: "lipca", augustus: "sierpnia", september: "września", oktober: "października", november: "listopada", december: "grudnia", jan: "sty", feb: "lut", mrt: "mar", apr: "kwi", jun: "cze", jul: "lip", aug: "sie", sep: "wrz", okt: "paź", nov: "lis", dec: "gru" };

function vertaal(s: string): string | null {
  const t = s.trim();
  if (!t) return null;
  // datums zoals "23 nov", "10 februari 2026" of "16 nov – 4 dec"
  if (/^\d{1,2} [a-z]+( \d{4})?( – \d{1,2} [a-z]+( \d{4})?)?$/.test(t)) return s.replace(t, t.replace(/[a-z]+/g, (m) => MAAND[m] ?? m));
  const delen = t.split(/, (?=[a-z])/); // samengestelde redenen ("budget 85% op, 2 dagen over einddatum")
  const een = (x: string) => PL[x] ?? REGELS.reduce<string | null>((r, [re, f]) => r ?? (re.test(x) ? x.replace(re, f as never) : null), null);
  let uit = een(t);
  if (uit === null && delen.length > 1) { const v = delen.map(een); if (v.every(Boolean)) uit = v.join(", "); }
  return uit === null ? null : s.replace(t, uit);
}

const ATTR = ["placeholder", "title", "aria-label"];
type Met = Node & { __nl?: string };

/** Zet alles binnenin om naar het Pools (aan) of terug naar het Nederlands (uit), ook wat later verschijnt. */
export function Vertaal({ aan, children }: { aan: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let bezig = false;
    const tekst = (n: Met) => {
      const nu = n.nodeValue ?? "";
      if (n.__nl !== undefined && (nu === n.__nl || nu === vertaal(n.__nl))) { /* al bekend */ } else n.__nl = nu;
      const doel = aan ? vertaal(n.__nl!) ?? n.__nl! : n.__nl!;
      if (nu !== doel) n.nodeValue = doel;
    };
    const elem = (e: Element & { __nlAttr?: Record<string, string> }) => {
      for (const a of ATTR) {
        const v = e.getAttribute(a);
        if (v === null) continue;
        e.__nlAttr ??= {};
        const oud = e.__nlAttr[a];
        if (oud === undefined || (v !== oud && v !== vertaal(oud))) e.__nlAttr[a] = v;
        const doel = aan ? vertaal(e.__nlAttr[a]) ?? e.__nlAttr[a] : e.__nlAttr[a];
        if (v !== doel) e.setAttribute(a, doel);
      }
    };
    const loop = (n: Node) => {
      if (n.nodeType === 3) return tekst(n as Met);
      if (n.nodeType !== 1) return;
      const el = n as Element;
      if (el.tagName === "TEXTAREA" || el.tagName === "INPUT" || el.tagName === "SCRIPT") { elem(el); return; }
      elem(el);
      el.childNodes.forEach(loop);
    };
    const run = () => { if (bezig) return; bezig = true; loop(root); bezig = false; };
    run();
    const mo = new MutationObserver(() => { mo.disconnect(); run(); mo.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTR }); });
    mo.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTR });
    return () => mo.disconnect();
  }, [aan]);
  return <div ref={ref}>{children}</div>;
}

import { EN } from "./taal/en";
import { DE } from "./taal/de";
import { PL } from "./taal/pl";

/**
 * Taal van de klant. Komt binnen via ?lang= (de website en de AI-assistent geven die mee) en wordt onthouden in de
 * cookie bm_taal. Nederlands is de standaard: zonder taal verandert er niets. Het beheer van Bart blijft Nederlands.
 */
export type Taal = "nl" | "en" | "de" | "pl";
export const TALEN: Taal[] = ["nl", "en", "de", "pl"];
export const TAAL_COOKIE = "bm_taal";

export const isTaal = (x: unknown): x is Taal => typeof x === "string" && (TALEN as string[]).includes(x);
export const naarTaal = (x: unknown): Taal => (isTaal(x) ? x : "nl");

const WOORDENBOEK: Record<Exclude<Taal, "nl">, Record<string, string>> = { en: EN, de: DE, pl: PL };

/**
 * Vertaalt een Nederlandse tekst. De Nederlandse tekst is zelf de sleutel, dus wat (nog) niet vertaald is blijft
 * gewoon Nederlands staan. {naam} in de tekst wordt vervangen door waarden.
 */
export function vertaal(taal: Taal, tekst: string, waarden?: Record<string, string | number>): string {
  let uit = taal === "nl" ? tekst : zoek(WOORDENBOEK[taal], tekst);
  if (waarden) for (const [k, v] of Object.entries(waarden)) uit = uit.split(`{${k}}`).join(String(v));
  return uit;
}

const kleinGeheugen = new WeakMap<Record<string, string>, Map<string, string>>();
/** Zelfde woordenboek, maar dan zonder hoofdletters (voor "Wit (houtmotief)" naast "Wit (Houtmotief)"). */
function klein(boek: Record<string, string>) {
  let m = kleinGeheugen.get(boek);
  if (!m) {
    m = new Map(Object.entries(boek).map(([k, v]) => [k.toLowerCase(), v]));
    kleinGeheugen.set(boek, m);
  }
  return m;
}

/**
 * Zoekt een tekst op. Staat hij er niet in zijn geheel in, dan worden de delen apart vertaald, zoals bij
 * "Wit (Houtmotief)", "Draai kiep - Vast" of "Kunststof schuifpui · Schuifpui 2-vaks". Onbekende delen blijven staan.
 */
function zoek(boek: Record<string, string>, tekst: string): string {
  const los = (x: string) => boek[x] ?? klein(boek).get(x.toLowerCase());
  const heel = los(tekst) ?? los(tekst.trim());
  if (heel !== undefined) return heel;
  const delen = tekst.split(/( \(|\)|, | - | – | \/ | · |: )/);
  if (delen.length < 2) return tekst;
  let iets = false;
  const uit = delen.map((d, i) => {
    if (i % 2 === 1 || !d.trim()) return d;
    const v = los(d) ?? los(d.trim());
    if (v !== undefined) iets = true;
    return v ?? d;
  });
  return iets ? uit.join("") : tekst;
}

/** Bedragen en getallen in de schrijfwijze van de taal. */
export const LOCALE: Record<Taal, string> = { nl: "nl-NL", en: "en-GB", de: "de-DE", pl: "pl-PL" };

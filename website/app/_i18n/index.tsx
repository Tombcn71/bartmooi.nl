import { Fragment, type ReactNode } from "react";
import { getTaal, setTaal } from "./stand";
import { en } from "./woorden/en";
import { de } from "./woorden/de";
import { pl } from "./woorden/pl";
import { pad, type Taal } from "./talen";

export * from "./talen";

export { getTaal, setTaal };

const WOORDEN: Record<Exclude<Taal, "nl">, Record<string, string>> = { en, de, pl };

/** Vertaalt een Nederlandse tekst. Staat er geen vertaling, dan blijft het Nederlands (en meldt het testscript dat). */
export function vertaal(taal: Taal, tekst: string): string {
  if (taal === "nl") return tekst;
  const v = WOORDEN[taal][tekst];
  if (v === undefined && process.env.I18N_LOG && /[A-Za-zÀ-ÿ]{3}/.test(tekst) && /[ a-zà-ÿ]/.test(tekst.slice(1)) && !/^[A-Z][A-Za-z]+$/.test(tekst) && !tekst.startsWith("/img") && !/\.(png|svg|jpg)$/.test(tekst)) {
    // Hulpmiddel bij het vertalen: schrijft op welke teksten nog geen vertaling hebben (alleen als I18N_LOG=1).
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("node:fs").appendFileSync(`/tmp/ontbreekt-${taal}.txt`, JSON.stringify(tekst) + "\n");
  }
  return v ?? tekst;
}
export const t = (tekst: string): string => vertaal(getTaal(), tekst);

/** Vertaalt alle teksten in een lijst of object (teksten zonder vertaling, zoals bestandsnamen en getallen, blijven zoals ze zijn). */
export function tt<T>(x: T): T {
  if (typeof x === "string") return t(x) as T;
  if (Array.isArray(x)) return x.map(tt) as T;
  if (x && typeof x === "object") return Object.fromEntries(Object.entries(x as Record<string, unknown>).map(([k, v]) => [k, tt(v)])) as T;
  return x;
}

/** Adres van een pagina in de taal van de huidige pagina. */
export const href = (nl: string): string => pad(nl, getTaal());

/** Tekst met een blauw deel: "Complete oplossingen voor {{kozijnen en deuren}}" (de woorden tussen {{ }} worden blauw). */
export function TB({ children, kleur = "text-kop" }: { children: string; kleur?: string }): ReactNode {
  const delen = vertaal(getTaal(), children).split(/(\{\{.*?\}\})/g);
  return delen.map((d, i) =>
    d.startsWith("{{") ? <span key={i} className={kleur}>{d.slice(2, -2)}</span> : <Fragment key={i}>{d}</Fragment>,
  );
}

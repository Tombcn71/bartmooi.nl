// Talen van de site. Nederlands staat op de hoofdadressen (zonder /nl), zodat bestaande adressen nooit hoeven te verhuizen.
// Komt er een taal bij (/en, /de, /pl), dan voeg je hem hier toe en zet je zijn adressen in `vertaald`.
export const STANDAARD = "nl";
export const TALEN = ["nl"] as const; // later: ["nl", "en", "de", "pl"]
export const HTML_TAAL: Record<string, string> = { nl: "nl-NL", en: "en", de: "de", pl: "pl-PL" };

/** Adres van een pagina in een andere taal; alleen pagina's die echt vertaald bestaan komen in hreflang. */
export const vertaald: Record<string, Partial<Record<"en" | "de" | "pl", string>>> = {
  // "/diensten/": { en: "/en/services/", de: "/de/leistungen/", pl: "/pl/uslugi/" },
};

export const voorvoegsel = (taal: string) => (taal === STANDAARD ? "" : `/${taal}`);

// Talen van de site. Nederlands staat op de hoofdadressen (zonder /nl), zodat bestaande adressen nooit verhuizen.
export type Taal = "nl" | "en" | "de" | "pl";
export const TALEN: Taal[] = ["nl", "en", "de", "pl"];
export const HTML_TAAL: Record<Taal, string> = { nl: "nl-NL", en: "en", de: "de", pl: "pl-PL" };
export const OG_TAAL: Record<Taal, string> = { nl: "nl_NL", en: "en_GB", de: "de_DE", pl: "pl_PL" };

/** Welke talen er echt bestaan. Zet een taal hier pas aan als zijn pagina's klaar zijn. */
export const ACTIEF: Taal[] = ["nl", "pl", "de", "en"];
/** Talen met een eigen blog (vertaalde artikelen). */
export const BLOG_TALEN: Taal[] = ["nl", "pl", "de", "en"];

/**
 * Adressen per pagina en taal (eigen, vertaalde adressen). De sleutel is het Nederlandse adres.
 * Alleen pagina's die in een taal echt bestaan, staan in hreflang.
 */
export const PADEN: Record<string, Partial<Record<Taal, string>>> = {
  "/": { nl: "/", en: "/en/", de: "/de/", pl: "/pl/" },
  "/diensten/": { en: "/en/services/", de: "/de/leistungen/", pl: "/pl/uslugi/" },
  "/over-ons/": { en: "/en/about-us/", de: "/de/ueber-uns/", pl: "/pl/o-nas/" },
  "/subsidie/": { en: "/en/subsidies/", de: "/de/foerderung/", pl: "/pl/dotacje/" },
  "/projecten/": { en: "/en/projects/", de: "/de/projekte/", pl: "/pl/realizacje/" },
  "/reviews/": { en: "/en/reviews/", de: "/de/bewertungen/", pl: "/pl/opinie/" },
  "/contact/": { en: "/en/contact/", de: "/de/kontakt/", pl: "/pl/kontakt/" },
  "/blog/": { en: "/en/blog/", de: "/de/blog/", pl: "/pl/blog/" },
  "/onderhoudstips-kozijnen-en-deuren-verleng-de-levensduur/": { en: "/en/blog/maintenance-tips-windows-doors-extend-lifespan/", de: "/de/blog/wartungstipps-fenster-tueren-lebensdauer-verlaengern/", pl: "/pl/blog/wskazowki-konserwacji-okien-i-drzwi-wydluz-zywotnosc/" },
  "/zoveel-bespaar-je-met-energiezuinige-kozijnen-laten-plaatsen/": { en: "/en/blog/how-much-you-save-with-energy-efficient-windows/", de: "/de/blog/so-viel-sparen-sie-mit-energieeffizienten-fenstern/", pl: "/pl/blog/ile-oszczedzisz-dzieki-energooszczednym-oknom/" },
  "/subsidies-kozijnen-en-deuren/": { en: "/en/blog/subsidies-windows-doors-the-hague/", de: "/de/blog/foerderungen-fenster-tueren-den-haag/", pl: "/pl/blog/dotacje-na-okna-i-drzwi-w-hadze/" },
  "/https-bartmooi-nl-kozijnen-in-den-haag/": { en: "/en/blog/windows-the-hague-why-upvc-or-aluminium-is-the-best-choice/", de: "/de/blog/fenster-den-haag-warum-kunststoff-oder-aluminium-die-beste-wahl-ist/", pl: "/pl/blog/okna-w-hadze-dlaczego-pvc-lub-aluminium-to-najlepszy-wybor/" },
  // Privacybeleid: de Engelse, Duitse en Poolse tekst volgt (juridische tekst); tot dan verwijzen deze talen naar het Nederlandse beleid.
  "/privacybeleid/": { en: "/en/privacy-policy/", de: "/de/datenschutz/", pl: "/pl/polityka-prywatnosci/" },
  "/bedankt/": { en: "/en/thank-you/", de: "/de/danke/", pl: "/pl/dziekujemy/" },
};

/** Adres van een (Nederlandse) pagina in een taal; valt terug op het Nederlandse adres. */
export function pad(nl: string, taal: Taal): string {
  if (taal === "nl") return nl;
  return PADEN[nl]?.[taal] ?? nl;
}

export const voorvoegsel = (taal: Taal) => (taal === "nl" ? "" : `/${taal}`);

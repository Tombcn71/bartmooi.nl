import { posts } from "../_content/posts";
import { nlSlug, postPad } from "../_content/postsvoor";
import type { Taal } from "../_i18n/talen";
import { bedrijf, JsonLd } from "./JsonLd";
import { seo } from "../_content/seo";
import { SITE } from "./seo";
import { HTML_TAAL, getTaal, pad as taalPad, t, tt, vertaal } from "../_i18n";

type Knoop = Record<string, unknown>;

const website: Knoop = { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: "BartMooi", inLanguage: "nl-NL", publisher: { "@id": `${SITE}/#bedrijf` } };

const oprichter: Knoop = { "@type": "Person", "@id": `${SITE}/#oprichter`, name: "Bartosz Piękny", jobTitle: "Eigenaar", worksFor: { "@id": `${SITE}/#bedrijf` } };

/** Bedrijfsgegevens, uitgebreid met wat de site zelf vermeldt (KvK, oprichter, sinds 2007). */
const bedrijfVolledig: Knoop = {
  ...bedrijf,
  identifier: { "@type": "PropertyValue", propertyID: "KVK", value: "98506560" },
  foundingDate: "2007",
  founder: { "@id": `${SITE}/#oprichter` },
  slogan: "Vakmanschap dat het verschil maakt voor jouw woning.",
  knowsAbout: ["Kunststof kozijnen", "Aluminium kozijnen", "HR+++ glas", "Deuren", "Schuifpuien", "Rolluiken", "Zonwering", "Veranda’s", "Subsidie voor isolatieglas"],
  contactPoint: { "@type": "ContactPoint", contactType: "klantenservice", telephone: "+31614112324", email: "info@bartmooi.nl", areaServed: "NL" },
  hasMap: "https://maps.google.com/maps?q=Burgemeester%20Hovylaan%20157%2C%202552XB%20%27s-Gravenhage",
};

export type Kruimel = [string, string][];

/** Eén schemagroep per pagina: bedrijf, website, de pagina zelf, het kruimelpad en eventuele extra onderdelen. */
export function Schema({ pad, type = "WebPage", kruimel = [], extra = [], afbeelding, datum }: { pad: string; type?: string; kruimel?: Kruimel; extra?: Knoop[]; afbeelding?: string; datum?: string }) {
  const taal = getTaal();
  const s = seo[pad];
  const eigen = taalPad(pad, taal);
  const url = `${SITE}${eigen}`;
  const pagina: Knoop = {
    "@type": type,
    "@id": `${url}#pagina`,
    url,
    name: s?.title ? vertaal(taal, s.title) : undefined,
    description: s?.description ? vertaal(taal, s.description) : undefined,
    inLanguage: HTML_TAAL[taal],
    isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": `${SITE}/#bedrijf` },
    primaryImageOfPage: afbeelding ? { "@type": "ImageObject", url: afbeelding } : undefined,
    datePublished: datum,
    breadcrumb: kruimel.length ? { "@id": `${url}#kruimel` } : undefined,
  };
  const graaf: Knoop[] = [bedrijfVolledig, oprichter, { ...website, inLanguage: HTML_TAAL[taal] }, pagina];
  if (kruimel.length) {
    graaf.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#kruimel`,
      itemListElement: kruimel.map(([naam, p], i) => ({ "@type": "ListItem", position: i + 1, name: t(naam), item: `${SITE}${taalPad(p, taal)}` })),
    });
  }
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": tt([...graaf, ...extra]) }} />;
}

export const dienst = (naam: string, beschrijving: string): Knoop => ({
  "@type": "Service",
  name: naam,
  description: beschrijving,
  serviceType: naam,
  provider: { "@id": `${SITE}/#bedrijf` },
  areaServed: { "@type": "Country", name: "Nederland" },
});

export const blogPost = (p: (typeof posts)[number], taal: Taal = "nl"): Knoop => ({
  "@type": "BlogPosting",
  "@id": `${SITE}${postPad(p, taal)}#artikel`,
  headline: p.titel,
  description: seo[`/${nlSlug(p)}/`]?.description ? vertaal(taal, seo[`/${nlSlug(p)}/`].description) : undefined,
  url: `${SITE}${postPad(p, taal)}`,
  datePublished: p.datum,
  dateModified: p.datum,
  image: `${SITE}${p.afbeelding}`,
  inLanguage: HTML_TAAL[taal],
  author: { "@id": `${SITE}/#bedrijf` },
  publisher: { "@id": `${SITE}/#bedrijf` },
  isPartOf: { "@id": `${SITE}${taalPad("/blog/", taal)}#pagina` },
});

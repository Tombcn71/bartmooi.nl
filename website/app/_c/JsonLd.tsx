import { SITE } from "./seo";
import { externeProfielen } from "../_content/profielen";

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export const bedrijf = {
  "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
  "@id": `${SITE}/#bedrijf`,
  name: "BartMooi B.V.",
  url: `${SITE}/`,
  logo: `${SITE}/img/logo.png`,
  image: `${SITE}/img/logo.png`,
  telephone: "+31614112324",
  email: "info@bartmooi.nl",
  description: "Kunststof en aluminium kozijnen, deuren, schuifpuien, rolluiken, zonwering en veranda’s op maat, met gratis inmeting en montage. Voor particulieren en VvE’s in Nederland.",
  vatID: undefined,
  address: { "@type": "PostalAddress", streetAddress: "Burgemeester Hovylaan 157", postalCode: "2552 XB", addressLocality: "'s-Gravenhage", addressCountry: "NL" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" }],
  areaServed: { "@type": "Country", name: "Nederland" },
  sameAs: externeProfielen.filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Diensten",
    itemListElement: ["Kunststof en aluminium kozijnen", "Buitendeuren en binnendeuren", "Schuifpuien en harmonicadeuren", "Rolluiken", "Binnenzonwering en horren", "Aluminium veranda’s"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
  },
};

export function kruimel(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([naam, pad], i) => ({ "@type": "ListItem", position: i + 1, name: naam, item: `${SITE}${pad}` })),
  };
}

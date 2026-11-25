import type { MetadataRoute } from "next";
import { posts } from "./_content/posts";
import { SITE, talen } from "./_c/seo";
import { ACTIEF, PADEN, pad } from "./_i18n/talen";

// Alle pagina’s in alle actieve talen, elk met verwijzingen naar de andere taalversies (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  const vast = ["/", "/diensten/", "/over-ons/", "/subsidie/", "/projecten/", "/reviews/", "/contact/", "/blog/", "/privacybeleid/"];
  const pagina = vast.flatMap((nl) =>
    ACTIEF.filter((taal) => taal === "nl" || PADEN[nl]?.[taal]).map((taal) => ({
      url: `${SITE}${pad(nl, taal)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: nl === "/" ? 1 : 0.7,
      alternates: { languages: talen(nl) },
    })),
  );
  return [...pagina, ...posts.map((p) => ({ url: `${SITE}/${p.slug}/`, lastModified: p.datum, changeFrequency: "yearly" as const, priority: 0.6 }))];
}

import { Schema, blogPost } from "../_c/schema";
import Image from "next/image";
import { Container, Lnk } from "../_c/ui";
import { Reveal } from "../_c/Onthul";
import { nlSlug, postPad, postsVoor } from "../_content/postsvoor";
import { Titel } from "../_c/Pagina";
import { getTaal, t } from "../_i18n";

export function Blog() {
  const taal = getTaal();
  const posts = postsVoor(taal);
  return (
    <>
      <Schema pad="/blog/" type="CollectionPage" kruimel={[["Home", "/"], ["Blog", "/blog/"]]} extra={[{ "@type": "Blog", "@id": "https://bartmooi.nl/blog/#blog", name: "Tips en nieuws over kozijnen", url: "https://bartmooi.nl/blog/", inLanguage: "nl-NL", publisher: { "@id": "https://bartmooi.nl/#bedrijf" }, blogPost: posts.map((p) => blogPost(p, taal)) }]} />
      <Titel kop="Tips en nieuws {{over kozijnen}}" klein />
      <section className="pb-[60px] md:pb-[108px]">
        <Container className="grid gap-x-[30px] gap-y-[60px] md:grid-cols-2">
          {posts.map((p, i) => (
            <Reveal key={p.slug} anim="fadeInUp" delay={(i % 2) * 100}>
              <Lnk href={postPad(p, taal)} className="block">
                <div className="relative aspect-[3/2] overflow-hidden"><Image src={p.afbeelding} alt="" fill sizes="(min-width: 768px) 555px, 100vw" className="object-cover" {...(i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const, priority: true } : {})} /></div>
                <h2 className="mt-5 text-[20.8px] font-bold leading-[25px] text-zwart">{p.titel}</h2>
                <p className="mt-2 text-[16px] leading-[24px]">{p.datum}</p>
                <p className="mt-3 text-[16px] leading-[24px]">{p.uittreksel}…</p>
                <p className="mt-4 text-[14px] font-bold uppercase leading-[14px] tracking-[1.6px] text-zwart">{t("Lees meer »")}</p>
              </Lnk>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}

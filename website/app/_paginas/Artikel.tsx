import Image from "next/image";
import { Container, Lnk } from "../_c/ui";
import type { Post } from "../_content/types";
import { nlSlug, postPad, postsVoor } from "../_content/postsvoor";
import { ankers } from "../_content/ankers";
import { faqPosts, kortAntwoord } from "../_content/faq";
import { AiKnop } from "../_c/AiKnop";
import { aiTeksten } from "../_c/teksten";
import { Faq } from "../_c/Pagina";
import { Reveal } from "../_c/Onthul";
import { Kalender } from "../_c/Icons";
import { SITE } from "../_c/seo";
import { Schema, blogPost } from "../_c/schema";
import { getTaal, t } from "../_i18n";

export function Artikel({ post }: { post: Post }) {
  const taal = getTaal();
  const nl = nlSlug(post);
  const faq = faqPosts[nl] ?? [];
  const andere = postsVoor(taal).filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <Schema pad={`/${nl}/`} kruimel={[["Home", "/"], ["Blog", "/blog/"], [post.titel, `/${nl}/`]]} afbeelding={`${SITE}${post.afbeelding}`} datum={post.datum} extra={[{ ...blogPost(post, taal), wordCount: post.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length, articleSection: "Kozijnen en deuren", mainEntityOfPage: { "@id": `${SITE}${postPad(post, taal)}#pagina` } }, ...(faq.length ? [{ "@type": "FAQPage", mainEntity: faq.map(({ v, a }) => ({ "@type": "Question", name: v, acceptedAnswer: { "@type": "Answer", text: a } })) }] : [])]} />
      <section className="relative bg-navy md:min-h-[446px]">
        <Image src="/img/bg-hero.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.06]" />
        <Container className="relative grid items-center gap-8 py-12 md:grid-cols-2 md:py-0 md:pb-[1px]">
          <div className="md:pr-10">
            <p className="flex items-center gap-2 text-[16px] leading-[24px] text-white/80"><Kalender /> {post.uitgebreid}</p>
            <h1 className="mt-[38px] text-[34px] font-bold leading-[1.2] tracking-[-1.2px] text-white md:text-[48px] md:leading-[57.6px] md:tracking-[-1.8px]">{post.titel}</h1>
          </div>
          <div className="relative -mx-4 aspect-[647/500] md:absolute md:right-0 md:top-0 md:mx-0 md:aspect-auto md:h-[500px] md:w-[calc(50%+3px)] md:max-w-[647px]">
            <Image src={post.afbeelding} alt="" fill sizes="(min-width: 768px) 647px, 100vw" className="object-cover" priority loading="eager" fetchPriority="high" />
          </div>
        </Container>
      </section>
      <section className="pb-[60px] pt-[48px] md:pb-[80px] md:pt-[108px]">
        <Container className="max-w-[800px]">
          <article>
            {kortAntwoord[nl] && (
              <aside aria-label={t("Kort antwoord")} className="mb-[30px] border-l-4 border-kop bg-licht p-5 text-[18px] leading-[27px] text-zwart">
                <p className="text-[14px] font-bold uppercase tracking-[1.6px] text-kop">{t("Kort antwoord")}</p>
                <p className="mt-2">{t(kortAntwoord[nl])}</p>
              </aside>
            )}
            <div className="tekst" dangerouslySetInnerHTML={{ __html: ankers(post.html) }} />
          </article>
          {faq.length > 0 && <Faq vragen={faq} smal kop={t("Veelgestelde vragen")} id="blog-faq" />}
          <div className="mt-10"><AiKnop variant="tekst" onderwerp={nl} l={aiTeksten()} /></div>
          <hr className="mt-[40px] border-black/10 md:mt-[60px]" />
        </Container>
      </section>
      <section className="relative bg-navy pb-[90px] pt-[72px] text-center">
        <Image src="/img/bg-cta-02d.jpg" alt="" fill sizes="100vw" className="object-cover" />
        <Container className="relative">
          <Reveal anim="fadeInUp"><h2 className="text-[34px] font-bold leading-[1.2] tracking-[-1.2px] text-white md:text-[48px] md:tracking-[-1.8px]">{t("Gerelateerde artikelen")}</h2></Reveal>
          <p className="mt-3 text-white/80">{t("Lees ook onze andere artikelen over kozijnen en woningisolatie.")}</p>
          <div className="mt-[52px] grid gap-8 text-left md:grid-cols-3">
            {andere.map((p) => (
              <Lnk key={p.slug} href={postPad(p, taal)} className="block text-white">
                <div className="relative aspect-[370/230] overflow-hidden"><Image src={p.afbeelding} alt="" fill sizes="370px" className="object-cover" /></div>
                <h3 className="mt-5 text-[18px] font-bold leading-[22px]">{p.titel}</h3>
                <p className="mt-3 text-[16px] leading-[24px] text-white/80">{p.datum}</p>
                <p className="mt-4 text-[14px] font-bold uppercase leading-[14px] tracking-[1.6px]">{t("Lees meer »")}</p>
              </Lnk>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

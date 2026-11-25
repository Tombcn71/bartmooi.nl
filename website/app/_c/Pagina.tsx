import Image from "next/image";
import type { ReactNode } from "react";
import { Direct, Reveal } from "./Anim";
import { Container, Knop } from "./ui";
import { href, t, TB } from "../_i18n";

/** Titelbalk bovenaan elke binnenpagina: grote titel in het midden met de lichte achtergrond. */
export function Titel({ kop, tekst, klein = false, middel = false, pb }: { kop: string; tekst?: string; klein?: boolean; middel?: boolean; pb?: string }) {
  return (
    <section className={`relative bg-licht ${klein ? "pb-[40px] pt-[40px] md:pb-[56px] md:pt-[56px]" : middel ? "pb-[60px] pt-[48px] md:pb-[90px] md:pt-[110px]" : `pb-[90px] pt-[48px] ${pb ?? "md:pb-[252px]"} md:pt-[92px]`}`}>
      <Image src="/img/bg-hero.jpg" alt="" fill sizes="100vw" quality={10} className="object-cover" loading="eager" />
      <Container className="relative max-w-[547px] text-center md:max-w-[547px]">
        <Direct anim="fadeInDown">
          <h1 className="text-[38.4px] font-bold leading-[46px] tracking-[-1.8px] text-zwart md:text-[64px] md:leading-[70.4px]">
            <TB>{kop}</TB>
          </h1>
        </Direct>
        {tekst && <Direct anim="fadeInDown" vertraging={100}><p className="mt-5 text-[16px] leading-[24px] md:pb-[22px] md:text-[18px] md:leading-[27px]">{t(tekst)}</p></Direct>}
      </Container>
    </section>
  );
}

export const Vink = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#1e5079" aria-hidden className="shrink-0"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.500 14.500l-4-4 1.400-1.400 2.600 2.600 5.600-5.600 1.400 1.400-7 7z" /></svg>
);

export function DienstKaart({ icoon, titel, tekst, punten, vertraging = 0 }: { icoon: string; titel: string; tekst: string; punten: string[]; vertraging?: number }) {
  return (
    <Reveal anim="fadeInUp" delay={vertraging} className="flex flex-col bg-white px-6 pb-[54px] pt-[44px] shadow-[0_0_30px_rgba(0,0,0,.08)] md:px-[47px]">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/img/${icoon}`} alt="" loading="lazy" decoding="async" className="size-[64px] shrink-0 object-contain object-left-top md:size-[117px]" />
        <div>
          <h2 className="text-[22px] font-bold leading-[1.2] text-zwart md:text-[27.2px] md:leading-[33px]">{t(titel)}</h2>
          <p className="mt-3">{t(tekst)}</p>
        </div>
      </div>
      <ul className="mt-6 space-y-[18px] text-[16px]">
        {punten.map((p) => (<li key={p} className="flex items-center gap-2.5"><Vink />{t(p)}</li>))}
      </ul>
      <div className="min-h-8 flex-1" />
      <Knop href="/contact/" className="w-[230px] self-start">{t("Gratis inmeting")}</Knop>
    </Reveal>
  );
}

/** Uitklapbare lijst (zoals de stappen op Diensten en de veelgestelde vragen). */
export function Uitklap({ items }: { items: [string, string][] }) {
  return (
    <div className="space-y-4">
      {items.map(([titel, p]) => (
        <details key={titel} className="group bg-white shadow-[0_0_10px_rgba(0,0,0,.04)]">
          <summary className="flex cursor-pointer list-none items-center justify-between px-[18px] py-[15px] text-[18px] font-bold leading-[24px] text-zwart [&::-webkit-details-marker]:hidden">
            {t(titel)}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="transition-transform group-open:rotate-90" aria-hidden><path d="M9 4l8 8-8 8-1.600-1.600L13.800 12 7.400 5.600z" /></svg>
          </summary>
          <p className="px-[18px] pb-[18px] text-[16px] leading-[24px]">{t(p)}</p>
        </details>
      ))}
    </div>
  );
}

/** Veelgestelde vragen: zichtbaar op de pagina en (via Schema) ook als FAQPage voor zoekmachines en AI. */
export function Faq({ vragen, kop = "Veelgestelde vragen", smal = false, id = "faq" }: { vragen: { v: string; a: string }[]; kop?: string; smal?: boolean; id?: string }) {
  return (
    <section aria-labelledby={id} className={smal ? "mt-[60px]" : "pb-[60px] pt-[60px] md:pb-[108px] md:pt-[108px]"}>
      <div className={smal ? "" : "mx-auto w-full max-w-[1140px] px-4 md:px-0"}>
        <h2 id={id} className="text-[34px] font-bold leading-[1.2] tracking-[-1.2px] text-zwart md:text-[48px] md:tracking-[-1.8px]">{t(kop)}</h2>
        <div className="mt-8 space-y-6">
          {vragen.map(({ v, a }) => (
            <div key={v}>
              <h3 className="text-[20.8px] font-bold leading-[25px] text-zwart">{t(v)}</h3>
              <p className="mt-2 max-w-[900px]">{t(a)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Prijsvoorbeelden als echte tabel (voor lezers én zoekmachines). Zonder prijzen toont dit niets. */
export function Prijstabel({ items }: { items: { omschrijving: string; prijs: string; inclusief: string }[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="prijzen" className="pb-[60px] pt-[60px] md:pb-[80px] md:pt-[80px]">
      <div className="mx-auto w-full max-w-[1140px] px-4 md:px-0">
        <h2 id="prijzen" className="text-[34px] font-bold leading-[1.2] tracking-[-1.2px] text-zwart md:text-[48px] md:tracking-[-1.8px]">{t("Prijsvoorbeelden")}</h2>
        <p className="mt-5 max-w-[760px]">{t("Zo rekent onze calculator voor een standaarduitvoering. Uw eigen maten en keuzes zet u in een halve minuut in de calculator of in de AI-assistent; dan ziet u direct uw prijs.")}</p>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <caption className="sr-only">{t("Prijsvoorbeelden per product")}</caption>
            <thead><tr className="border-b-2 border-zwart/20 text-zwart"><th scope="col" className="py-3 pr-4 font-bold">{t("Product en afmeting")}</th><th scope="col" className="py-3 pr-4 text-right font-bold">{t("Prijs")}</th><th scope="col" className="py-3 font-bold">{t("Inclusief")}</th></tr></thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.omschrijving} className="border-b border-black/10">
                  <th scope="row" className="py-3 pr-4 font-normal">{i.omschrijving}</th>
                  <td className="whitespace-nowrap py-3 pr-4 text-right font-bold text-zwart">{i.prijs}</td>
                  <td className="py-3">{i.inclusief || "btw"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

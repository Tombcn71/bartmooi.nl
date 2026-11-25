import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "./Onthul";
import { Teller } from "./Anim";
import { Container, Eyebrow, H2, Vinkje } from "./ui";
import { t, TB } from "../_i18n";

/** Twee kolommen: links kop, rechts tekst. Donker (zoals op de homepage) of licht. */
export function Verhaal({ eyebrow, kop, alinea, licht = false }: { eyebrow: string; kop: string; alinea: string[]; licht?: boolean }) {
  return (
    <section className={`${licht ? "bg-white" : "bg-navy text-white"} pb-[48px] pt-[48px] md:pb-[82px] md:pt-[64px]`}>
      <Container breed className="grid gap-8 md:grid-cols-[414px_1fr] md:items-center md:gap-[20px]">
        <div>
          <Eyebrow kleur={licht ? "text-oranje-tekst" : "text-[#1fb3e7]"}>{t(eyebrow)}</Eyebrow>
          <H2 kleur={licht ? "text-zwart" : "text-white"} className="mt-3"><TB>{kop}</TB></H2>
        </div>
        <div className="space-y-[21px] pb-[22px] md:min-h-[200px]">
          {alinea.map((a) => (<p key={a} className="text-[14px] leading-[32px] md:text-[18px] md:leading-[35px]">{t(a)}</p>))}
        </div>
      </Container>
    </section>
  );
}

/** Foto links, tekst rechts, met oranje kaartje onder de foto. */
export function Specialist({ foto, belofte, eyebrow, kop, tekst, cijfers }: { foto: string; belofte: [string, string]; eyebrow: string; kop: string; tekst: string; cijfers: [number, string][] }) {
  return (
    <section className="pb-[60px] pt-[36px] md:pb-[99px]">
      <Container className="grid items-center gap-12 md:grid-cols-[456px_582px] md:justify-between">
        <div className="relative h-[279px] md:h-[500px]">
          <div className="absolute inset-0 overflow-hidden rounded-t-[179px] md:rounded-t-[228px]"><Image src={foto} alt="" fill sizes="456px" className="object-cover" /></div>
          <div className="absolute -bottom-[1px] left-[236px] hidden w-[238px] bg-oranje p-5 text-white md:block">
            <p className="text-[18px] font-bold leading-[23px]">{t(belofte[0])}</p>
            <p className="mt-2 text-[20px] font-medium leading-[28px]">{t(belofte[1])}</p>
          </div>
        </div>
        <div className="text-center md:text-left">
          <Eyebrow>{t(eyebrow)}</Eyebrow>
          <Reveal anim="fadeInUp"><H2 className="mt-3"><TB>{kop}</TB></H2></Reveal>
          <p className="mt-5 pb-[22px]">{t(tekst)}</p>
          <div className="mt-2 flex justify-center gap-[100px] md:justify-start md:pl-[10px]">
            {cijfers.map(([n, label]) => (
              <div key={label}>
                <p className="flex items-start justify-center text-[48px] font-bold leading-[58px] text-zwart md:justify-start"><Teller tot={n} /><span className="mt-1 text-[36.8px] text-blauw">+</span></p>
                <p className="text-[20px] font-medium leading-[30px]">{t(label)}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Kop, tekst, lijst met vinkjes links en drie foto's rechts. */
export function Onderscheid({ eyebrow, kop, tekst, items }: { eyebrow: string; kop: string; tekst: string; items: string[] }) {
  return (
    <section className="pb-[60px] pt-[48px] md:pb-[90px] md:pt-[72px]">
      <Container className="grid gap-12 md:grid-cols-[529px_479px] md:justify-between md:gap-[132px]">
        <div className="text-center md:text-left">
          <Eyebrow>{t(eyebrow)}</Eyebrow>
          <H2 className="mt-3"><TB>{kop}</TB></H2>
          <p className="mt-5 max-w-[529px] pb-[22px]">{t(tekst)}</p>
          <ul className="mt-3 space-y-[30px]">
            {items.map((titel, i) => (
              <Reveal as="li" key={titel} anim="fadeInLeft" delay={(i + 1) * 100} className="flex flex-col items-center gap-3 md:flex-row md:gap-[19px]">
                <Vinkje />
                <h3 className="text-[24px] font-bold leading-[49px] text-zwart">{t(titel)}</h3>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="order-first flex flex-col gap-2.5 md:relative md:order-none md:block md:h-[840px] md:w-full md:max-w-[479px]">
          <div className="relative h-[300px] overflow-hidden rounded-t-[179px] md:absolute md:inset-x-0 md:top-0 md:h-[500px] md:rounded-t-[239px]"><Image src="/img/workman-adjusting-window-frames-at-home-2021-10-13-18-27-58-utc.jpg" alt="" fill sizes="479px" className="object-cover" /></div>
          <div className="relative h-[150px] md:absolute md:left-0 md:top-[520px] md:w-[239px]"><Image src="/img/the-carpenter-holds-the-drill-and-drills-the-windo-2021-08-31-12-07-23-utc.jpg" alt="" fill sizes="239px" className="object-cover" /></div>
          <div className="relative h-[150px] md:absolute md:left-[10px] md:top-[690px] md:w-[239px]"><Image src="/img/assembling-fitting-a-roof-window-skylight-with-2021-12-08-17-22-53-utc.jpg" alt="" fill sizes="239px" className="object-cover" /></div>
        </div>
      </Container>
    </section>
  );
}

/** Getuigenis met grote foto links, citaat rechts. */
export function Getuigenis({ eyebrow, kop, foto, citaat, naam, functie, cursief = false }: { eyebrow: string; kop: string; foto: string; citaat: string; naam: string; functie: string; cursief?: boolean }) {
  return (
    <section className="bg-licht pb-[60px] pt-[60px] md:pb-[137px] md:pt-[128px]">
      <Container className="max-w-[1004px]">
        <Eyebrow className="text-center">{t(eyebrow)}</Eyebrow>
        <Reveal anim="fadeInUp"><H2 className="mt-3 text-center md:h-[94px]"><TB>{kop}</TB></H2></Reveal>
        <Reveal anim="fadeInUp" delay={100} className="mt-2.5 grid bg-white md:grid-cols-[410px_1fr]">
          <div className="relative min-h-[300px] md:min-h-[390px]"><Image src={foto} alt="" fill sizes="410px" className="object-cover" /></div>
          <div className="p-6 md:px-[49px] md:pt-[49px]">
            <span className="flex size-[57px] items-center justify-center rounded-full bg-blauw text-white" aria-hidden><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" /></svg></span>
            <p className={`mt-5 text-[18px] leading-[27px] text-zwart ${cursief ? "font-medium italic" : ""}`}>{t(citaat)}</p>
            <p className="mt-5 text-[20.8px] font-bold leading-[25px] text-blauw">{naam}</p>
            <p className="text-[18px] leading-[27px]">{t(functie)}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

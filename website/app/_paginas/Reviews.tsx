import { JsonLd, kruimel } from "../_c/JsonLd";
import Image from "next/image";
import { Blauw, Container, H2 } from "../_c/ui";
import { Reveal, Teller } from "../_c/Anim";
import { Cta } from "../_c/Sections2";
import { Titel } from "../_c/Pagina";
import { Schema } from "../_c/schema";
import { href, t, TB, tt } from "../_i18n";

const reviews: [string[], string][] = [
  [["„Eerst intake gedaan waarin de wensen werden besproken en alles netjes werd nagemeten.", "Daarna niet lang hoeven wachten voordat mijn kunstof kozijnen met triple glas werden geleverd. Alles netjes afgewerkt en aardige vaklui. Ontzettend blij met het resultaat.”"], "Leontien"],
  [["„Inmeten gebeurd heel secuur en klopt exact. Montage wordt super netjes uitgevoerd, mannen gaan pas naar huis als het klaar en werkplek netjes opgeruimd is. Dat zie je tegenwoordig niet vaak meer. Toppers! Wij kunnen Bart Mooi kozijnen aan een ieder aanbevelen. Wij zijn heel erg tevreden.”"], "Tjerk"],
  [["„Ik ben ontzettend blij met Bart Mooi! Alle afspraken werden keurig nagekomen, de werkplek bleef netjes en wat eerst vijf dagen zou duren, was in drieënhalve dag klaar. Dankzij Bart begin ik mijn dag nu heerlijk met uitzicht op het licht in mijn huis – ik ben er echt heel blij mee!”"], "Dirk"],
];

const cijfers = [["benefit-4-white.png", 7, "+", "Ervaren monteurs"], ["benefit-6-white.png", 117, "+", "Afgeronde projecten"], ["benefit-5-white.png", 90, "%", "Klanttevredenheid"]] as const;

export function Reviews() {
  return (
    <>
      <Schema pad="/reviews/" kruimel={[["Home", "/"], ["Reviews", "/reviews/"]]} extra={reviews.map(([regels, naam]) => ({ "@type": "Review", itemReviewed: { "@id": "https://bartmooi.nl/#bedrijf" }, author: { "@type": "Person", name: naam }, reviewBody: regels.join(" ").replace(/[„”]/g, ""), reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5, worstRating: 1 }, inLanguage: "nl-NL" }))} />
      <JsonLd data={kruimel([["Home", "/"], ["Reviews", "/reviews/"]])} />
      <Titel kop="Wat onze klanten {{over ons zeggen}}" pb="md:pb-[180px]" />
      <section className="pb-[60px] md:pb-[120px]">
        <Container className="max-w-[1120px]">
          <div className="relative z-10 grid gap-6 md:-mt-[137px] md:grid-cols-3 md:gap-[14px]">
            {tt(reviews).map(([regels, naam], i) => (
              <Reveal key={naam} anim="fadeInUp" delay={i * 100} className="flex flex-col bg-white px-[31px] pb-[33px] pt-[33px] shadow-[0_0_30px_rgba(0,0,0,.08)] md:min-h-[594px]">
                <div className="flex-1">{regels.map((r) => (<p key={r} className="pb-[21.6px] text-[18px] leading-[27px]">{r}</p>))}</div>
                <Image src="/img/4afda0dc-5509-43e8-8231-75cd629181f3-1024x444.jpg" alt={t("5 sterren")} width={178} height={77} className="mx-auto mt-4" />
                <hr className="mx-auto my-5 w-[100px] border-t-2 border-blauw" />
                <p className="text-center text-[27.2px] font-bold leading-[33px] text-zwart">{naam}</p>
                <p className="text-center text-[14px] font-semibold uppercase leading-[24px] tracking-[1.6px]">{t("Klant")}</p>
              </Reveal>
            ))}
          </div>
          <Reveal anim="fadeInUp"><H2 className="mt-[44px] text-center"><TB>{"Bekijk alle {{andere beordelingen}}"}</TB></H2></Reveal>
          <div className="hidden h-[83px] md:block" aria-hidden />
        </Container>
      </section>

      <section className="bg-navy py-[60px] text-white md:pb-[70px] md:pt-[88px]">
        <Container className="grid max-w-[1120px] gap-10 md:grid-cols-3 md:gap-0">
          {tt(cijfers).map(([img, n, teken, label]) => (
            <div key={label} className="flex flex-col items-center text-center md:border-l md:border-white/15 md:first:border-0">
              <Image src={`/img/${img}`} alt="" width={97} height={97} unoptimized />
              <p className="mt-[22px] flex items-start text-[48px] font-bold leading-[58px]"><Teller tot={n} /><span className="mt-1 text-[36.8px] text-[#f08661]">{teken}</span></p>
              <p className="text-[20px] font-medium leading-[30px] text-white/80">{label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="pb-[111px] pt-[60px] md:pt-[118px]">
        <Container className="max-w-[1120px]">
          <div className="relative h-[300px] md:h-[432px]"><Image src="/img/happy-family-park-scaled.jpg" alt={t("Tevreden gezin")} fill sizes="1120px" className="object-cover" /></div>
          <div className="relative mx-auto -mt-[60px] max-w-[762px] bg-white px-6 pb-[56px] pt-[62px] text-center shadow-[0_0_30px_rgba(0,0,0,.08)] md:-mt-[108px] md:px-[123px]">
            <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-1px] text-zwart md:text-[36.8px] md:leading-[44px]"><TB>{"Waarom klanten voor {{ons kiezen}}?"}</TB></h2>
            <hr className="mx-auto my-5 w-[100px] border-t-2 border-blauw" />
            <p className="pb-[22px]">{t("Wij begrijpen dat nieuwe kozijnen een grote investering zijn. Daarom werken wij uitsluitend transparant, komen we onze afspraken na en leveren we altijd perfect maatwerk. Jouw comfort en veiligheid staan bij ons voorop.")}</p>
          </div>
        </Container>
      </section>
      <div className="hidden h-[254px] md:block" aria-hidden />

      <Cta kop="Wilt u een vergelijkbaar resultaat?" regels={["Vraag voor een gratis adviesgesprek.", "Onze specialisten komen bij je langs voor nauwkeurige inmeting en professioneel advies."]} />
    </>
  );
}

import { JsonLd, kruimel } from "../_c/JsonLd";
import Image from "next/image";
import { Blauw, Container, Eyebrow, H2, Knop, Vinkje } from "../_c/ui";
import { Direct, Reveal, Teller } from "../_c/Anim";
import { Cta } from "../_c/Sections2";
import { Schema, dienst } from "../_c/schema";
import { Faq } from "../_c/Pagina";
import { faqSubsidie } from "../_content/faq";
import { href, t, TB, tt } from "../_i18n";

const hulp = [
  ["Hoe wij u helpen bij de aanvraag", "Wij adviseren welke oplossingen voldoen aan de subsidievoorwaarden."],
  ["Wij begeleiden u in het proces", "Wij informeren welke documenten nodig zijn voor de aanvraag."],
  ["Hulp bij technische eisen", "Wij leveren de technische specificaties die vereist zijn voor subsidie."],
];

const redenen = [
  ["Uitstekende warmte- en geluidsisolatie", "Onze oplossingen verhogen het wooncomfort en verlagen energiekosten."],
  ["Duurzame materialen en betrouwbaarheid", "Wij werken uitsluitend met bewezen systemen van gerenommeerde fabrikanten."],
  ["Volledig maatwerk", "Elk project wordt afgestemd op jouw woning en wensen."],
  ["Service van A tot Z", "Advies, inmeting, levering en montage."],
];

const galerij = [
  ["b128dbf3-698a-458e-b901-7441ffa274bf.jpg", "md:col-start-1 md:row-start-1"],
  ["fa5ffe11-4712-4225-bd13-e4223043bfd8-1.jpg", "md:col-start-1 md:row-start-2"],
  ["IMG_1817.jpg", "md:col-start-2 md:row-span-2 md:row-start-1"],
  ["c6dc9e37-9963-48fd-aa65-36b1902362bb.jpg", "md:col-span-2 md:col-start-3 md:row-start-1"],
  ["e7388125-38a0-4a97-bd83-a858be9fc415.jpg", "md:col-start-3 md:row-start-2"],
  ["IMG_2842-Large.jpeg", "md:col-start-4 md:row-start-2"],
] as const;

export function Subsidie() {
  return (
    <>
      <Schema pad="/subsidie/" kruimel={[["Home", "/"], ["Subsidie", "/subsidie/"]]} extra={[dienst("Hulp bij subsidie voor kozijnen en deuren", "Wij adviseren welke oplossingen voldoen aan de subsidievoorwaarden, informeren welke documenten nodig zijn voor de aanvraag en leveren de technische specificaties."), { "@type": "FAQPage", mainEntity: faqSubsidie.map(({ v, a }) => ({ "@type": "Question", name: v, acceptedAnswer: { "@type": "Answer", text: a } })) }]} />
      <JsonLd data={kruimel([["Home", "/"], ["Subsidie", "/subsidie/"]])} />
      <section className="relative bg-licht pb-[60px] pt-[40px] md:pb-[83px] md:pt-[92px]">
        <Image src="/img/bg-hero.jpg" alt="" fill sizes="100vw" quality={10} className="object-cover" loading="eager" />
        <Container className="relative grid items-start gap-10 md:grid-cols-[526px_513px] md:justify-between">
          <div className="text-center md:text-left">
            <Direct anim="fadeInDown">
              <h1 className="text-[38.4px] font-bold leading-[46px] tracking-[-1.8px] text-zwart md:text-[64px] md:leading-[70.4px]"><TB>{"Subsidie voor {{nieuwe kozijnen en deuren}}"}</TB></h1>
            </Direct>
            <p className="mt-5 text-[18px] font-medium leading-[28.5px] md:text-[20px]">{t("Bij vervangen van kozijnen en deuren kunt u in aanmerking komen voor subsidieregelingen in Nederland. Ontdek hoe u kunt besparen op uw investering.")}</p>
            <Knop href="/contact/" className="mt-5">{t("Plan een gratis adviesgesprek")}</Knop>
          </div>
          <div className="relative mx-auto h-[300px] w-full max-w-[513px] overflow-hidden rounded-t-[200px] md:h-[400px] md:rounded-t-[256px]">
            <Image src="/img/workman-adjusting-window-frames-at-home-2021-10-13-18-27-58-utc.jpg" alt="" fill sizes="(min-width: 768px) 513px, 100vw" className="object-cover" priority loading="eager" fetchPriority="high" />
          </div>
        </Container>
      </section>

      <section className="pb-[60px] pt-[60px] md:pb-[120px] md:pt-[110px]">
        <Container className="max-w-[1100px]">
          <div className="grid items-center gap-6 md:grid-cols-[540px_504px] md:justify-between">
            <div><Eyebrow>{t("Financieel voordeel")}</Eyebrow><Reveal anim="fadeInUp"><H2 className="mt-3"><TB>{"Bespaar aanzienlijk op uw {{investering}}"}</TB></H2></Reveal></div>
            <p>{t("Subsidies zijn bedoeld om de energieprestaties van woningen te verbeteren. Kozijnen met HR++ of HR+++ beglazing verminderen warmteverlies aanzienlijk. Hierdoor kunt u een deel van uw investering terugkrijgen.")}</p>
          </div>
          <div className="mt-[50px] grid gap-8 md:grid-cols-3 md:justify-between md:gap-[51px]">
            {tt(hulp).map(([titel, p], i) => (
              <Reveal key={titel} anim="fadeInUp" delay={i * 100}>
                <h3 className="text-[20.8px] font-bold leading-[25px] text-zwart">{titel}</h3>
                <p className="mt-5 pb-[22px]">{p}</p>
              </Reveal>
            ))}
          </div>
          <Knop href="/contact/" className="mt-3">{t("Gratis advies aanvragen")}</Knop>
        </Container>
      </section>

      <section className="pb-[119px] pt-[100px]">
        <Container className="max-w-[1120px] text-center">
          <Eyebrow>{t("Voor wie")}</Eyebrow>
          <Reveal anim="fadeInUp"><H2 className="mt-3"><TB>{"Wie komt in {{aanmerking}}?"}</TB></H2></Reveal>
          <div className="mt-[76px] grid gap-10 md:grid-cols-3">
            {tt(["Huiseigenaren", "VvE’s", "Particulieren die verduurzamen"]).map((x, i) => (
              <Reveal key={x} anim="fadeInUp" delay={i * 100} className="flex flex-col items-center gap-5">
                <Vinkje />
                <h3 className="text-[24px] font-bold leading-[34px] text-zwart">{x}</h3>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-licht pb-[110px] pt-[104px]">
        <Container className="grid items-start gap-12 md:grid-cols-[456px_582px] md:justify-between">
          <div className="relative h-[300px] md:h-[500px]">
            <div className="absolute inset-0 overflow-hidden rounded-t-[200px] md:rounded-t-[228px]">
              <Image src="/img/workman-adjusting-window-frames-at-home-2021-09-02-09-19-19-utc-1-956x1024.jpg" alt="" fill sizes="456px" className="object-cover" />
            </div>
            <div className="absolute -bottom-[1px] left-[236px] hidden w-[238px] bg-oranje p-5 text-center text-white md:block">
              <p className="flex items-start justify-center text-[48px] font-bold leading-[58px]"><Teller tot={15} /><span className="mt-1 text-[27.2px]">+</span></p>
              <p className="text-[20px] font-medium leading-[28px]">{t("Jaren ervaring")}</p>
            </div>
          </div>
          <div>
            <Eyebrow>{t("Waarom ons")}</Eyebrow>
            <Reveal anim="fadeInUp"><H2 className="mt-3"><TB>{"Waarom kiezen voor {{Bart Mooi}}?"}</TB></H2></Reveal>
            <p className="mt-5 pb-[22px]">{t("Wij combineren moderne technologie met jarenlange ervaring om kozijnen en deuren te leveren die generaties lang meegaan.")}</p>
            <ul className="mt-3 grid gap-x-[46px] gap-y-[29px] sm:grid-cols-2">
              {tt(redenen).map(([titel, p], i) => (
                <Reveal as="li" key={titel} anim="fadeInUp" delay={i * 100} className="flex items-start gap-4">
                  <Vinkje />
                  <div><h3 className="text-[20px] font-bold leading-[26px] text-zwart">{titel}</h3><p className="mt-2 text-[16px] leading-[24px]">{p}</p></div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="pb-[108px] pt-[100px]">
        <Container className="max-w-[1120px] text-center">
          <Eyebrow>{t("Galerij")}</Eyebrow>
          <Reveal anim="fadeInUp"><H2 className="mt-3"><TB>{"Beelden van {{onze projecten}}"}</TB></H2></Reveal>
          <div className="mt-[46px] grid grid-cols-2 gap-4 md:mx-[8px] md:grid-cols-[208px_462px_191px_191px] md:grid-rows-[200px_200px] md:gap-x-4 md:gap-y-5">
            {galerij.map(([f, plek]) => (
              <div key={f} className={`relative h-[180px] overflow-hidden md:h-auto ${plek}`}>
                <Image src={`/img/${f}`} alt="" fill sizes="462px" className="object-cover" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Faq vragen={faqSubsidie} />
      <Cta kop="Plan een gratis adviesgesprek" regels={["Wij adviseren welke oplossingen voldoen aan de subsidievoorwaarden.", "Wij informeren welke documenten nodig zijn voor de aanvraag.", "Wij leveren de technische specificaties die vereist zijn voor subsidie."]} lijst={false} knop="Gratis advies aanvragen" kopBreed />
    </>
  );
}

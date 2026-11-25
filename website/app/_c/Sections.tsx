import Image from "next/image";
import { Reveal } from "./Onthul";
import { Teller } from "./Anim";
import { Blauw, Container, Eyebrow, H2, Knop, Vinkje } from "./ui";
import { href, t, TB, tt } from "../_i18n";

export function Pil({ tekst }: { tekst: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[16px] font-medium leading-[22px] text-zwart">
      <svg width="32" height="32" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0"><defs><linearGradient id="pilkleur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4fa8e0" /><stop offset="1" stopColor="#1f5fa6" /></linearGradient></defs><path d="M24 5 43 24 24 43 5 24Z" fill="url(#pilkleur)" /></svg>
      {tekst}
    </span>
  );
}

export function Voordelen() {
  const lijst = [
    ["/img/33-1.png", "Gratis inmeting"], ["/img/34-1.png", "Persoonlijk advies"], ["/img/35-1.png", "Montage van A tot Z"],
  ];
  return (
    <section className="hidden bg-white py-9 md:block">
      <Container>
       <div className="grid grid-cols-1 gap-y-5 md:max-w-[440px] md:grid-cols-2 md:gap-x-6">
        {tt(lijst).map(([src, alt], i) => (<Reveal key={src} anim="fadeInUp" delay={(i + 1) * 100}><Pil tekst={alt} /></Reveal>))}
      </div>
      </Container>
    </section>
  );
}

export function OverOns() {
  return (
    <section className="bg-navy pb-[48px] pt-[48px] text-white md:pb-[82px] md:pt-[64px]">
      <Container breed className="grid gap-8 md:grid-cols-[414px_1fr] md:items-center md:gap-[20px]">
        <div>
          <Eyebrow kleur="text-[#1fb3e7]">{t("Over ons")}</Eyebrow>
          <H2 kleur="text-white" className="mt-3">{t("Vakmanschap en kwaliteit in elk detail")}</H2>
        </div>
        <div className="space-y-[21px] pb-[22px]">
          <p className="text-[14px] leading-[32px] md:text-[18px] md:leading-[35px]">{t("Bij BartMooi draait alles om kwaliteit en verantwoordelijkheid. Al bijna twintig jaar realiseren wij projecten voor particulieren en VvE’s.")}</p>
          <p className="text-[14px] leading-[32px] md:text-[18px] md:leading-[35px]">{t("Wij komen afspraken na. Transparant werken en communiceren staat bij ons centraal. Geen verborgen kosten en geen verrassingen achteraf.")}</p>
          <p className="text-[14px] leading-[32px] md:text-[18px] md:leading-[35px]">{t("Ons team van ervaren monteurs staat garant voor nauwkeurige montage en een perfecte afwerking.")}</p>
        </div>
      </Container>
    </section>
  );
}

export const diensten = [
  ["window-2.svg", "Kunststof en aluminium kozijnen", "Volledig op maat gemaakt en professioneel gemonteerd."],
  ["open.svg", "Schuifpuien en harmonicadeuren", "Combinatie van modern design met uitstekende isolatiewaarden."],
  ["door-1.svg", "Deuren op maat", "Onze deuren combineren isolatie, veiligheid en duurzaamheid."],
  ["garage.svg", "Rolluiken", "Rolluiken verbeteren de isolatie, verhogen de privacy en versterken de beveiliging"],
  ["blinds.svg", "Binnenzonwering en horren", "Functionaliteit gecombineerd met uitstraling en duurzaamheid."],
  ["pergola.svg", "Aluminium veranda’s", "Onze aluminium veranda’s zijn duurzaam, onderhoudsarm en bestand tegen alle weersomstandigheden."],
];

export function Diensten() {
  return (
    <section className="pb-[60px] pt-[60px] md:pb-[108px] md:pt-[108px]">
      <Container className="grid gap-12 md:grid-cols-[456px_643px] md:gap-[41px]">
        <div className="relative h-[279px] md:h-[500px]">
          <div className="absolute inset-x-0 top-0 h-[279px] overflow-hidden rounded-t-[179px] md:h-[500px] md:rounded-t-[228px]">
            <Image src="/img/462282134_2477492645794235_7277804402738725414_n-1.jpg" alt={t("Monteur plaatst een kozijn")} fill sizes="456px" className="object-cover" />
          </div>
          <div className="absolute -left-[18px] bottom-[-22px] z-10 hidden h-[118px] w-[274px] bg-blauw md:block" />
          <div className="absolute bottom-[-4px] left-0 z-20 hidden h-[118px] w-[274px] md:flex flex-col items-center justify-center bg-oranje text-white">
            <p className="text-[48px] font-bold leading-[58px]"><Teller tot={19} /><sup className="align-super text-[27px]">+</sup></p>
            <p className="text-[20.8px] font-bold leading-[25px]">{t("Jaren ervaring")}</p>
          </div>
        </div>
        <div className="text-center md:text-left">
          <Eyebrow>{t("Onze diensten")}</Eyebrow>
          <Reveal anim="fadeInUp"><H2 className="mt-3"><TB>{"Complete oplossingen voor {{kozijnen en deuren}}"}</TB></H2></Reveal>
          <p className="mt-5 max-w-[553px]">{t("Wij leveren en monteren energiezuinige kozijnen, deuren en zonweringssystemen voor particulieren en VvE’s. Elk project realiseren wij met aandacht voor detail, optimale isolatiewaarden en duurzaamheid.")}</p>
          <Knop href="/diensten/" className="mt-7 px-[33px] md:mr-0">{t("Lees meer")}</Knop>
          <ul className="mt-5 grid gap-x-[39px] gap-y-9 sm:grid-cols-2">
            {tt(diensten).map(([ico, titel, tekst], i) => (
              <Reveal as="li" key={titel} anim="fadeInUp" delay={[100, 200, 300, 400, 100, 200][i]} className="flex flex-col items-center gap-2.5 text-center md:flex-row md:text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/img/${ico}`} alt="" loading="lazy" decoding="async" className="size-[98px] shrink-0 object-contain md:size-[86px] md:object-left-top" />
                <div>
                  <h3 className="text-[20.8px] font-bold leading-[25px] text-zwart">{titel}</h3>
                  <p className="mt-3.5 text-[16px] leading-[24px]">{tekst}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

const redenen = [
  ["Uitstekende warmte- en geluidsisolatie", "Onze oplossingen verhogen het wooncomfort en verlagen energiekosten."],
  ["Volledig maatwerk", "Elk project wordt afgestemd op jouw woning en wensen."],
  ["Duurzame materialen en betrouwbaarheid", "Wij werken uitsluitend met bewezen systemen van gerenommeerde fabrikanten."],
  ["Service van A tot Z", "Advies, inmeting, levering en montage."],
];

export function WaaromOns() {
  return (
    <section className="pb-[60px] pt-[48px] md:pb-[90px] md:pt-[72px]">
      <Container className="grid gap-12 md:grid-cols-[529px_479px] md:justify-between md:gap-[132px]">
        <div className="text-center md:text-left">
          <Eyebrow>{t("Waarom ons")}</Eyebrow>
          <H2 className="mt-3"><TB>{"Waarom kiezen voor {{Bart Mooi}}?"}</TB></H2>
          <p className="mt-5 max-w-[529px]">{t("Wij combineren moderne technologie met jarenlange ervaring om kozijnen en deuren te leveren die generaties lang meegaan.")}</p>
          <ul className="mt-[27px] space-y-[27px]">
            {tt(redenen).map(([titel, p], i) => (
              <Reveal as="li" key={titel} anim="fadeInLeft" delay={[100, 200, 300, 300][i]} className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:gap-[19px] md:text-left">
                <Vinkje />
                <div>
                  <h3 className="text-[24px] font-bold leading-[34px] text-zwart">{titel}</h3>
                  <p className="mt-1.5 text-[18px] leading-[27px]">{p}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="order-first flex flex-col gap-2.5 md:relative md:order-none md:block md:h-[840px] md:w-full md:max-w-[479px]">
          <div className="relative h-[300px] overflow-hidden rounded-t-[179px] md:absolute md:inset-x-0 md:top-0 md:h-[500px] md:rounded-t-[239px]">
            <Image src="/img/workman-adjusting-window-frames-at-home-2021-10-13-18-27-58-utc.jpg" alt={t("Monteur past een kozijn aan")} fill sizes="479px" className="object-cover" />
          </div>
          <div className="relative h-[150px] md:absolute md:left-0 md:top-[520px] md:w-[239px]"><Image src="/img/the-carpenter-holds-the-drill-and-drills-the-windo-2021-08-31-12-07-23-utc.jpg" alt={t("Boormachine")} fill sizes="239px" className="object-cover" /></div>
          <div className="relative h-[150px] md:absolute md:left-0 md:top-[690px] md:w-[239px]"><Image src="/img/assembling-fitting-a-roof-window-skylight-with-2021-12-08-17-22-53-utc.jpg" alt={t("Dakraam")} fill sizes="239px" className="object-cover" /></div>
        </div>
      </Container>
    </section>
  );
}

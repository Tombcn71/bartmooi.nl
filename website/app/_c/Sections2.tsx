import Image from "next/image";
import { Reveal } from "./Onthul";
import { Teller } from "./Anim";
import { Blauw, Container, Eyebrow, H2, Knop, Lnk } from "./ui";
import { href, t, TB, tt } from "../_i18n";

const cel = (img: string, titel: string, klasse: string, groot = false) => (
  <Lnk href="/projecten/" aria-label={t(titel)} className={`relative block overflow-hidden ${klasse}`}>
    <Image src={`/img/${img}`} alt="" fill sizes="500px" className="object-cover" />
    <Reveal as="span" anim="slideInLeft" className={`absolute bottom-0 left-0 bg-white px-6 font-bold text-zwart ${groot ? "py-[18px] text-[27.2px] leading-[33px]" : "py-[14px] text-[20.8px] leading-[25px]"}`}>{t(titel)}</Reveal>
  </Lnk>
);

export function VoorWie() {
  return (
    <section className="bg-navy pb-[60px] pt-[60px] md:pb-[106px] md:pt-[110px]">
      <Container className="max-w-[1208px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[590px]">
            <Eyebrow kleur="text-[#f08661]">{t("Voor wie")}</Eyebrow>
            <Reveal anim="fadeInUp"><H2 kleur="text-white" className="mt-3">{t("Projecten op maat voor elke opdrachtgever")}</H2></Reveal>
          </div>
          <Knop href="/projecten/" className="shrink-0 gap-3">{t("Bekijk meer")}<span aria-hidden>→</span></Knop>
        </div>
        <div className="mt-[52px] grid gap-3 md:grid-cols-[500px_1fr]">
          {cel("abstract-texture-background-of-building-windows-2021-09-01-01-46-12-utc-1.jpg", "VvE’s", "h-[300px] md:h-[496px]", true)}
          <div className="grid gap-3 md:grid-rows-[251px_233px]">
            <div className="grid gap-3 md:grid-cols-[413px_1fr]">
              {cel("elegant-bathroom-design-2021-10-21-02-42-29-utc.jpg", "Huiseigenaren", "h-[200px] md:h-auto")}
              {cel("modern-spacious-room-with-large-panoramic-window-2021-09-02-04-31-31-utc.jpg", "Bedrijven", "h-[200px] md:h-auto")}
            </div>
            <div className="grid gap-3 md:grid-cols-[271px_1fr]">
              {cel("empty-lobby-in-a-modern-building-8PSAAQR.jpg", "Investeerders", "h-[200px] md:h-auto")}
              {cel("modern-home-kitchen-through-glass-doors-2021-08-29-09-04-17-utc.jpg", "Renovatieprojecten", "h-[200px] md:h-auto")}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

const stappen = [
  ["01", "Gratis inmeting", "Onze specialisten komen bij u langs voor nauwkeurige inmeting en persoonlijk advies op maat."],
  ["02", "Persoonlijke offerte", "U ontvangt een heldere, op maat gemaakte prijsopgave. Geen verborgen kosten."],
  ["03", "Productie op maat", "Uw kozijnen en deuren worden met de hoogste precisie geproduceerd volgens de afgesproken specificaties."],
  ["04", "Professionele montage", "Ons ervaren montageteam plaatst alles vakkundig en zorgt voor een perfecte, schone afwerking."],
];

export function Werkwijze() {
  const pos = [
    "md:left-0 md:top-[29px] md:h-[230px]",
    "md:left-[303px] md:top-0 md:h-[232px]",
    "md:left-0 md:top-[272px] md:h-[254px]",
    "md:left-[303px] md:top-[244px] md:h-[252px]",
  ];
  return (
    <section className="bg-licht pb-9 pt-[60px] md:pt-[108px]">
      <Container className="grid items-center gap-10 md:grid-cols-[471px_592px] md:justify-between">
        <div>
          <Eyebrow>{t("Onze werkwijze")}</Eyebrow>
          <H2 className="mt-3"><TB>{"In 4 stappen naar {{uw nieuwe kozijnen}}"}</TB></H2>
          <p className="mt-5">{t("Wij maken het u graag makkelijk. Van het eerste contact tot de laatste afwerking zorgen wij voor een transparant en zorgeloos proces zonder verrassingen achteraf.")}</p>
          <Knop href="/contact/" className="mt-6">{t("Vrijblijvende offerte")}</Knop>
        </div>
        <div className="relative grid gap-3.5 md:block md:h-[527px]">
          {tt(stappen).map(([nr, titel, p], i) => (
            <Reveal key={nr} anim="zoomIn" delay={(i + 1) * 100} className={`px-[18px] pb-6 shadow-[0_8px_30px_rgba(0,0,0,.08)] md:absolute md:w-[289px] ${pos[i]} ${i === 2 ? "bg-blauw text-white/80" : "bg-white"}`}>
              <p className={`-ml-[18px] inline-block px-[18px] pt-[12px] text-[27.2px] font-bold leading-[37px] ${i === 2 ? "bg-white/15 text-white" : "bg-blauw/10 text-blauw"}`}>{nr}</p>
              <h3 className={`mt-[26px] text-[20.8px] font-bold leading-[25px] ${i === 2 ? "text-white" : "text-zwart"}`}>{titel}</h3>
              <p className="mt-3 text-[16px] leading-[23px]">{p}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Ervaringen() {
  return (
    <section className="bg-licht pb-[60px] pt-[60px] md:pb-[118px] md:pt-[128px]">
      <Container className="max-w-[1004px]">
        <Eyebrow className="text-center">{t("Ervaringen")}</Eyebrow>
        <Reveal anim="fadeInUp"><H2 className="mt-3 text-center md:h-[94px]"><TB>{"Wat {{onze klanten}} over ons zeggen"}</TB></H2></Reveal>
        <Reveal anim="fadeInUp" delay={100} className="mt-2.5 grid bg-white md:grid-cols-[410px_1fr]">
          <div className="relative min-h-[300px] md:min-h-[433px]"><Image src="/img/couple-standing-near-the-window-indoors-2021-12-09-09-35-02-utc-1.jpg" alt={t("Tevreden klanten")} fill sizes="410px" className="object-cover" /></div>
          <div className="p-6 md:px-[49px] md:pt-[49px]">
            <span className="flex size-[48px] items-center justify-center rounded-full bg-blauw text-white" aria-hidden><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" /></svg></span>
            <p className="mt-5 text-[20px] font-medium italic leading-[29px] text-zwart">{t("„Eerst intake gedaan waarin de wensen werden besproken en alles netjes werd nagemeten. Daarna niet lang hoeven wachten voordat mijn kunstof kozijnen met triple glas werden geleverd. Alles netjes afgewerkt en aardige vaklui. Ontzettend blij met het resultaat.”")}</p>
            <p className="mt-5 text-[20.8px] font-bold leading-[25px] text-blauw">{t("Leontien")}</p>
            <p className="text-[18px] leading-[27px]">{t("Klant")}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const cijfers = [["people.png", "5", "+", "Ervaren monteurs"], ["grid-2.png", "85", "+", "Afgeronde projecten"], ["like-shapes-02.png", "65", "%", "Klanttevredenheid"]];

export function Cijfers() {
  return (
    <section className="pb-[60px] pt-[40px] md:pb-[100px] md:pt-[64px]">
      <Container className="grid max-w-[1120px] gap-10 md:grid-cols-3">
        {tt(cijfers).map(([img, getal, teken, label]) => (
          <div key={label} className="flex flex-col items-center border-b border-black/10 pb-10 text-center last:border-0 last:pb-0 md:border-0 md:pb-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/img/${img}`} alt="" width={70} height={70} className="h-[68px] w-auto md:h-[74px]" />
            <p className="mt-[30px] flex items-start text-[36.8px] font-bold leading-[47px] text-zwart"><Teller tot={Number(getal)} /><span className="mt-[-6px] text-[27.2px] text-blauw">{teken}</span></p>
            <p className="text-[20.8px] font-bold leading-[25px]">{label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

export function Cta({ kop = "Gratis inmeting. Perfecte pasvorm.", regels = ["Onze specialisten komen bij je langs voor nauwkeurige inmeting en professioneel advies."], lijst = true, knop = "Plan een gratis inmeting", href = "/contact/", kopBreed = false }: { kop?: string; regels?: string[]; lijst?: boolean; knop?: string; href?: string; kopBreed?: boolean }) {
  return (
    <section className="relative bg-navy py-[72px] text-center">
      <Image src="/img/bg-cta-02d.jpg" alt="" fill sizes="100vw" className="object-cover" />
      <Container className="relative max-w-[672px]">
        <Reveal anim="fadeInUp"><H2 kleur="text-white" className={`mx-auto ${kopBreed ? "max-w-[672px]" : "max-w-[560px]"}`}>{t(kop)}</H2></Reveal>
        <Reveal anim="fadeInUp">
          <div className="mt-5 text-[18px] leading-[27px] text-white/80">{regels.map((r) => (<p key={r} className="pb-[22px]">{t(r)}</p>))}</div>
        </Reveal>
        {lijst && (
          <ul className="mt-[18px] flex flex-wrap justify-center gap-x-7 text-white">
            {["Nauwkeurigheid", "Geen meetfouten", "Geen verrassingen"].map((x) => (<li key={x} className="flex items-center gap-2"><span aria-hidden className="text-[#1fb3e7]">✓</span>{t(x)}</li>))}
          </ul>
        )}
        <Reveal anim="fadeInUp"><Knop href={href} className="mt-6 bg-oranje">{t(knop)}</Knop></Reveal>
      </Container>
    </section>
  );
}

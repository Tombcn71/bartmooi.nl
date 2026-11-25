import { Schema, dienst } from "../_c/schema";
import Image from "next/image";
import { Blauw, Container, Eyebrow, H2 } from "../_c/ui";
import { Reveal } from "../_c/Onthul";
import { Cta } from "../_c/Sections2";
import { DienstKaart, Faq, Prijstabel, Titel, Uitklap } from "../_c/Pagina";
import { euro, haalPrijzen, omschrijving } from "../_content/prijzen";
import { faqDiensten } from "../_content/faq";
import { href, t, TB, tt } from "../_i18n";

const kaarten = [
  ["window-2.svg", "Kunststof en aluminium kozijnen", "Wij leveren kunststof en aluminium kozijnen op maat met HR++ en HR+++ beglazing voor optimale warmte- en geluidsisolatie. Onze systemen verhogen het wooncomfort en verminderen warmteverlies.", ["Lagere energiekosten", "Betere geluidsisolatie", "Duurzaam en onderhoudsarm"]],
  ["door-1.svg", "Buitendeuren en binnendeuren", "Deuren die design en veiligheid combineren - wij bieden voordeuren, terrasdeuren en binnendeuren in diverse stijlen en kleuren. Elk model wordt volledig op maat gemaakt. Veiligheidssystemen en isolerende vullingen zorgen voor comfort en bescherming.", ["Hoge inbraakwerendheid en veiligheid", "Ruime keuze in stijlen en kleuren"]],
  ["open.svg", "Schuifpuien en harmonicadeuren", "Grote glasoppervlakken zorgen voor meer licht en ruimte. Onze schuifpuien en harmonicadeuren bieden uitstekende isolatie en luchtdichtheid. Ideaal voor moderne woningen en renovatieprojecten.", ["Ruimtebesparend ontwerp", "Soepele en lichte bediening"]],
  ["garage.svg", "Rolluiken voor extra privacy en isolatie", "Rolluiken beschermen tegen zon, kou en geluidsoverlast. Ze verhogen ook de veiligheid van uw woning. Beschikbaar met bediening in handmatige en elektrische uitvoering.", ["Bescherming tegen zon en hitte", "Extra privacy en inbraakvertraging"]],
  ["blinds.svg", "Binnenzonwering en horren", "Controle over licht en stijlvolle afwerking. Wij leveren houten en aluminium jaloezieën, rolgordijnen én horren, volledig op maat voor elk type raam, inclusief draaikiepramen. Functionaliteit gecombineerd met design en duurzaamheid.", ["Stijlvolle afwerking en perfect maatwerk", "Effectieve bescherming tegen insecten"]],
  ["pergola.svg", "Aluminium veranda’s", "Extra leefruimte het hele jaar door Aluminium veranda’s zijn duurzaam, onderhoudsarm en weerbestendig. Ideaal voor wie comfort en functionaliteit waardeert.", ["Waardevermeerdering van de woning", "Duurzaam en onderhoudsarm", "Het hele jaar door te gebruiken"]],
] as const;

const stappen: [string, string][] = [
  ["01 Gratis inmeting en advies", "Wij komen persoonlijk bij u langs om de situatie te bekijken, uw wensen te bespreken en alles nauwkeurig in te meten. Dit eerste gesprek is altijd geheel vrijblijvend."],
  ["02 Persoonlijke offerte", "Op basis van de inmeting ontvangt u van ons een heldere, op maat gemaakte offerte. Geen verborgen kosten, maar een eerlijke en transparante prijs voor uw project."],
  ["03 Productie op maat", "Na uw akkoord starten we met de productie. Uw nieuwe kozijnen worden met de hoogste precisie en van duurzame materialen speciaal voor uw woning vervaardigd."],
  ["04 Professionele montage", "Ons ervaren team komt de kozijnen vakkundig plaatsen. We werken netjes, efficiënt en zorgen voor een perfecte afwerking met minimale overlast in uw woning."],
  ["05 Oplevering en klanttevredenheid", "Na de montage lopen we alles samen met u na. We vertrekken pas als u honderd procent tevreden bent met het eindresultaat en laten de werkplek altijd bezemschoon achter."],
];

export async function Diensten() {
  const prijzen = await haalPrijzen();
  const prijsRegels = prijzen.map((p) => ({ omschrijving: omschrijving(p), prijs: euro(p.prijs), inclusief: p.inclusief ? `${p.inclusief === "btw" ? "btw" : "montage en btw"}` : "" }));
  return (
    <>
      <Schema pad="/diensten/" type="CollectionPage" kruimel={[["Home", "/"], ["Diensten", "/diensten/"]]} extra={[...kaarten.map(([, naam, tekst]) => dienst(naam, tekst)), ...prijzen.map((p) => ({ "@type": "Product", name: omschrijving(p), brand: { "@type": "Brand", name: "BartMooi" }, offers: { "@type": "Offer", price: p.prijs.toFixed(2), priceCurrency: "EUR", seller: { "@id": "https://bartmooi.nl/#bedrijf" }, url: "https://bartmooi.nl/diensten/" } })), { "@type": "HowTo", name: "5 stappen naar jouw vernieuwde woning", description: "Van gratis inmeting tot oplevering: zo werkt BartMooi.", step: stappen.map(([naam, tekst], i) => ({ "@type": "HowToStep", position: i + 1, name: naam.replace(/^\d+\s/, ""), text: tekst })) }, { "@type": "FAQPage", mainEntity: faqDiensten.map(({ v, a }) => ({ "@type": "Question", name: v, acceptedAnswer: { "@type": "Answer", text: a } })) }]} />
      <Titel kop="Onze {{diensten}}" tekst="Wij leveren en monteren energiezuinige kozijnen, deuren en zonweringssystemen voor particulieren en VvE’s. Elk project realiseren wij met aandacht voor detail, optimale isolatiewaarden en duurzaamheid." />
      <section className="pb-[60px] md:pb-[108px]">
        <Container className="relative z-10 grid max-w-[1140px] gap-6 md:-mt-[178px] md:grid-cols-2 md:gap-x-[36px] md:gap-y-[40px]">
          {kaarten.map(([ico, titel, p, pts], i) => (<DienstKaart key={titel} icoon={ico} titel={titel} tekst={p} punten={[...pts]} vertraging={(i % 2) * 100} />))}
        </Container>
      </section>
      <section className="bg-licht pb-[60px] pt-[60px] md:pb-[126px] md:pt-[108px]">
        <Container className="grid items-start gap-12 md:grid-cols-[476px_570px] md:justify-between">
          <div>
            <Eyebrow>{t("Ons proces")}</Eyebrow>
            <Reveal anim="fadeInUp"><H2 className="mt-3"><TB>{"5 stappen naar jouw {{vernieuwde woning}}"}</TB></H2></Reveal>
            <p className="mt-5 max-w-[428px] pb-[22px]">{t("Ontdek hoe wij te werk gaan. Van het eerste advies tot de vakkundige montage zorgen wij voor een zorgeloos traject voor uw nieuwe kozijnen.")}</p>
            <div className="max-w-[428px]"><Uitklap items={stappen} /></div>
          </div>
          <div className="relative h-[360px] md:h-[500px]">
            <div className="relative h-full overflow-hidden rounded-t-[200px] md:rounded-t-[285px]">
              <Image src="/img/builder-mounting-balcony-fence-2021-12-09-03-19-47-utc-1.jpg" alt={t("Monteur plaatst een kozijn")} fill sizes="570px" className="object-cover" />
            </div>
            <Reveal anim="fadeInUp" delay={100} className="absolute -left-4 bottom-[-40px] flex w-[314px] max-w-[92%] items-center gap-4 bg-oranje p-6 text-white md:-left-[1px] md:bottom-[-60px] md:-translate-x-[45px]">
              <Image src="/img/home-vineyard-portrait-mature-woman-enjoying-day-vineyards-1024x1024.jpg" alt="" width={68} height={68} className="size-[68px] shrink-0 rounded-full border-2 border-white object-cover" />
              <p className="text-[20px] font-medium leading-[30px]">{t("„De beste service die we ooit hebben gehad.”")}</p>
            </Reveal>
          </div>
        </Container>
      </section>
      <Prijstabel items={prijsRegels} />
      <Faq vragen={faqDiensten} />
      <Cta />
    </>
  );
}

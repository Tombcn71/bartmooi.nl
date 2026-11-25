import { JsonLd, kruimel } from "../_c/JsonLd";
import Image from "next/image";
import { Blauw, Container } from "../_c/ui";
import { Reveal } from "../_c/Onthul";
import { Cta } from "../_c/Sections2";
import { Pil } from "../_c/Sections";
import { Titel } from "../_c/Pagina";
import { Schema } from "../_c/schema";
import { Getuigenis, Onderscheid, Specialist, Verhaal } from "../_c/Blokken";
import { href, t, TB, tt } from "../_i18n";

export function OverOns() {
  return (
    <>
      <Schema pad="/over-ons/" type="AboutPage" kruimel={[["Home", "/"], ["Over ons", "/over-ons/"]]} />
      <JsonLd data={kruimel([["Home", "/"], ["Over ons", "/over-ons/"]])} />
      <Titel middel kop="Over {{ons}}" tekst="BartMooi heeft twintig jaar ervaring in kozijnen en deuren. Wij realiseren oplossingen die esthetiek, duurzaamheid en energie-efficiëntie combineren." />
      <section className="py-9 md:py-14">
        <Container className="grid justify-items-center gap-4 md:grid-cols-3">
          {tt(["Gratis inmeting", "Persoonlijk advies", "Montage van A tot Z"]).map((f, i) => (
            <Reveal key={f} anim="fadeInUp" delay={(i + 1) * 100}><Pil tekst={f} /></Reveal>
          ))}
        </Container>
      </section>
      <Verhaal licht eyebrow="Over ons" kop="Het verhaal achter BartMooi" alinea={["De naam BartMooi is ontstaan uit de voor- en achternaam van de oprichter. Al vanaf het begin staan kwaliteit en eerlijkheid centraal. Onze eerste klanten van twintig jaar geleden genieten nog steeds van onze oplossingen en bevelen ons aan."]} />
      <Specialist
        foto="/img/builder-mounting-balcony-fence-2021-12-09-03-18-29-utc-1.jpg"
        belofte={["Onze belofte:", "Geen verborgen kosten en afspraken nakomen."]}
        eyebrow="Zakelijk & particulier"
        kop="Dé specialist in kozijnen en deuren {{sinds 2007}}"
        tekst="Wij hebben projecten gerealiseerd voor grote investeringen en gerenommeerde bouwbedrijven. Wij werken voor particulieren en VvE’s. Elk project behandelen wij met dezelfde zorg, ongeacht de omvang."
        cijfers={[[8, "Ervaren monteurs"], [19, "Jaren ervaring"]]}
      />
      <Onderscheid
        eyebrow="Wat ons onderscheidt"
        kop="Waarom kiezen voor {{BartMooi}}?"
        tekst="Wij komen afspraken na, werken transparant en zorgen voor een perfecte afwerking zonder verborgen kosten."
        items={["Afspraken nakomen", "Geen onverwachte verrassingen", "Volledig maatwerk", "Hoge warmte- en geluidsisolatie", "Ervaren montageteam"]}
      />
      <Getuigenis
        eyebrow="Onze filosofie"
        kop="Duurzaamheid, isolatie en {{perfecte afwerking}}"
        foto="/img/gallery-team-01.jpg"
        citaat="“Kozijnen en deuren zijn voor ons niet enkel werk, maar een passie met verantwoordelijkheid voor comfort en veiligheid. Wij focussen op duurzaamheid, isolatie en perfecte afwerking.”"
        naam="Bartosz Piękny"
        functie="Eigenaar"
      />
      <Cta />
    </>
  );
}

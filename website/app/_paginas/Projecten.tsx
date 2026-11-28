import { Schema } from "../_c/schema";
import { Blauw, Container, Eyebrow, H2, Vinkje } from "../_c/ui";
import { Reveal } from "../_c/Onthul";
import { Cta } from "../_c/Sections2";
import { Mozaiek } from "../_c/Mozaiek";
import { href, t, TB, tt } from "../_i18n";

const projecten = ["Erker Den Haag", "Hamed Moordrecht", "Wassenaar", "Inge Den Haag", "Ermelostraat Den Haag", "Madelijn Den Haag", "Rolluiken Hoofdorp", "Gravezande", "Hovylaan", "Binnenvensterbank"];

export function Projecten() {
  return (
    <>
      <Schema pad="/projecten/" type="CollectionPage" kruimel={[["Home", "/"], ["Projecten", "/projecten/"]]} extra={[{ "@type": "ItemList", name: "Gerealiseerde projecten", itemListElement: projecten.map((naam, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "CreativeWork", name: naam, creator: { "@id": "https://www.bartmooi.nl/#bedrijf" } } })) }]} />
      <section className="bg-licht pb-[60px] pt-[48px] md:pb-[132px] md:pt-[56px]">
        <Container className="max-w-[1208px]">
          <div className="grid items-center gap-5 md:grid-cols-[590px_590px] md:justify-between">
            <div>
              <Eyebrow>{t("Projecten")}</Eyebrow>
              <Reveal anim="fadeInUp"><H2 as="h1" className="mt-3"><TB>{"Onze projecten: {{kwaliteit zichtbaar in elk detail}}"}</TB></H2></Reveal>
            </div>
            <p className="pb-[22px]">{t("Wij hebben tientallen projecten gerealiseerd voor particulieren, VvE’s en investeerders. Elk project combineert precisie, uitstraling en functionaliteit.")}</p>
          </div>
          <div className="mt-[52px]">
            <Mozaiek
              cellen={[
                { foto: "e7388125-38a0-4a97-bd83-a858be9fc415.jpg", titel: "Erker Den Haag" },
                { foto: "fa5ffe11-4712-4225-bd13-e4223043bfd8.jpg", titel: "Hamed Moordrecht" },
                { foto: "IMG_4227-Large.jpeg", titel: "Wassenaar" },
                { foto: "2008aef6-b8b4-4124-93da-eee3becb6cb9.jpg", titel: "Inge Den Haag" },
                { foto: "IMG_1817.jpg", titel: "Ermelostraat Den Haag" },
                { foto: "IMG_8501-Large.jpeg", titel: "Madelijn Den Haag" },
                { foto: "941651af-fe05-480e-aff5-ad4c7c04ef28.jpg", titel: "Rolluiken Hoofdorp", positie: "object-top" },
                { foto: "IMG_2842-Large.jpeg", titel: "Gravezande" },
                { foto: "IMG_3137-Large.jpeg", titel: "Hovylaan" },
                { foto: "beff4ce4-9aa7-4cc5-9e07-16cc2cd2395d.jpg", titel: "Binnenvensterbank" },
              ]}
            />
          </div>
        </Container>
      </section>
      <section className="pb-[119px] pt-[100px]">
        <Container className="max-w-[1120px] text-center">
          <Eyebrow>{t("Waarom ons")}</Eyebrow>
          <Reveal anim="fadeInUp"><H2 className="mt-3"><TB>{"Wat onze projecten {{uniek maakt}}"}</TB></H2></Reveal>
          <div className="mt-[76px] grid gap-10 md:grid-cols-4">
            {tt(["Nauwkeurige montage", "Tijdige oplevering", "Duurzame materialen", "De perfecte afwerking"]).map((titel, i) => (
              <Reveal key={titel} anim="fadeInUp" delay={i * 100} className="flex flex-col items-center gap-5">
                <Vinkje />
                <h3 className="max-w-[240px] text-[24px] font-bold leading-[34px] text-zwart">{titel}</h3>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <Cta kop="Wilt u een vergelijkbaar resultaat?" regels={["Neem contact met ons op!"]} />
    </>
  );
}

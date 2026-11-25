import Image from "next/image";
import { SITE } from "../_c/seo";
import { Schema, dienst } from "../_c/schema";
import { diensten } from "../_c/Sections";
import { AiKnop } from "../_c/AiKnop";
import { aiTeksten } from "../_c/teksten";
import { Reveal } from "../_c/Onthul";
import { Teller } from "../_c/Anim";
import { Voordelen, OverOns, Diensten, WaaromOns } from "../_c/Sections";
import { VoorWie, Werkwijze, Ervaringen, Cijfers, Cta } from "../_c/Sections2";
import { href, t, TB } from "../_i18n";

export function Home() {
  return (
    <>
      <Schema pad="/" extra={diensten.map(([naam, tekst]) => dienst(naam, tekst))} afbeelding={`${SITE}/img/og/IMG_1817-1.jpg`} />
      <section className="relative z-10 bg-licht">
        <div className="relative mx-auto max-w-[1140px] px-4 pb-[129px] md:h-[598px] md:px-0 md:pb-0">


          <div className="pt-8 text-center md:absolute md:left-0 md:top-[95px] md:w-[589px] md:pt-0 md:text-left">
            <h1 className="text-[38.4px] font-bold leading-[46px] tracking-[-1.8px] text-zwart md:text-[48px] md:leading-[52.8px]">{t("Kozijnen en deuren op maat.")}<br />
              <span className="text-kop">{t("Vakmanschap dat het verschil maakt voor jouw woning.")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[495px] text-[16px] leading-[24px] md:mx-0 md:text-[18px] md:leading-[27px]">{t("Wij zijn gespecialiseerd in de levering en montage van energiezuinige kozijnen, deuren en zonweringssystemen. Poolse precisie gecombineerd met Duitse kwaliteit. Met jarenlange ervaring op de Nederlandse markt.")}</p>
            <AiKnop l={aiTeksten()} />
          </div>

          <div className="relative mx-auto mt-[43px] h-[303px] w-[332px] overflow-hidden rounded-t-[166px] md:absolute md:left-[627px] md:top-[56px] md:mt-0 md:h-[623px] md:w-[513px] md:rounded-t-[256px]">
            <Image src="/img/hero.jpg" alt={t("Monteur plaatst een deurslot")} fill sizes="(min-width: 768px) 513px, 332px" className="object-cover" priority loading="eager" fetchPriority="high" />
          </div>
          <Reveal anim="fadeInUp" className="absolute left-[481px] top-[521px] z-10 hidden h-[193px] w-[267px] items-center gap-4 bg-white pl-[51px] pr-5 shadow-[0_0_30px_rgba(0,0,0,.1)] md:flex">
            <Image src="/img/home-vineyard-portrait-mature-woman-enjoying-day-vineyards-1024x1024.jpg" alt="" width={39} height={39} className="size-[39px] shrink-0 rounded-full object-cover" />
            <p className="text-[18px] font-medium leading-[23px] text-zwart">{t("“Alles netjes afgewerkt en ontzettend blij!”")}</p>
          </Reveal>
          <div className="absolute left-[1009px] top-[328px] z-10 hidden md:flex h-[110px] w-[200px] flex-col items-center justify-center bg-oranje text-white shadow-[-14px_14px_0_0_#184061]">
            <p className="flex items-center gap-2 text-[40px] font-bold leading-[44px]"><Teller tot={5} decimalen={1} /> <span aria-hidden className="text-[34px]">★</span></p>
            <p className="text-[20px] font-medium leading-[30px]">{t("op Google")}</p>
          </div>
        </div>
      </section>
      <Voordelen />
      <OverOns />
      <Diensten />
      <WaaromOns />
      <VoorWie />
      <Werkwijze />
      <Ervaringen />
      <Cijfers />
      <Cta />
    </>
  );
}

import { Container } from "../_c/ui";
import { privacyDelen } from "../_content/privacy";
import { privacyDelenEn } from "../_content/privacy-en";
import { privacyDelenDe } from "../_content/privacy-de";
import { privacyDelenPl } from "../_content/privacy-pl";
import { getTaal, t } from "../_i18n";

export function Privacybeleid() {
  const [, ...rest] = getTaal() === "en" ? privacyDelenEn : getTaal() === "de" ? privacyDelenDe : getTaal() === "pl" ? privacyDelenPl : privacyDelen;
  return (
    <>
      <section className="bg-navy py-[60px] md:pb-[160px] md:pt-[72px]">
        <Container><h1 className="text-[38.4px] font-bold leading-[46px] tracking-[-1.8px] text-white md:text-[64px] md:leading-[70px]">{t("Privacybeleid")}</h1></Container>
      </section>
      <section className="bg-licht pb-[80px]">
        <Container className="max-w-[1000px]">
          <div className="relative z-10 bg-white px-6 py-10 shadow-[0_0_30px_rgba(0,0,0,.06)] md:-mt-[100px] md:px-[60px]">
            {rest.map((d, i) =>
              d.soort === "heading" ? (
                <h2 key={i} className="mb-3 mt-8 text-[20.8px] font-bold leading-[25px] text-zwart first:mt-0 first:text-[27.2px] first:leading-[33px]" dangerouslySetInnerHTML={{ __html: d.html.replace(/<\/?h\d[^>]*>/g, "") }} />
              ) : (
                <div key={i} className="tekst text-[18px] leading-[27px] [&_h2]:text-[20.8px] [&_h2]:leading-[25px]" dangerouslySetInnerHTML={{ __html: d.html }} />
              ),
            )}
          </div>
        </Container>
      </section>
    </>
  );
}

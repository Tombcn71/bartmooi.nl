import { Schema } from "../_c/schema";
import Image from "next/image";
import { Container, Eyebrow, H2, Lnk } from "../_c/ui";
import { Formulier } from "../_c/Formulier";
import { formulierTeksten } from "../_c/teksten";
import { Envelop, Facebook, Instagram, Punt, Telefoon, TelefoonGroot, Mail } from "../_c/Icons";
import { href, t, TB } from "../_i18n";

const rondje = "flex size-[44px] shrink-0 items-center justify-center rounded-full bg-white text-navy";

export function Contact() {
  return (
    <>
      <Schema pad="/contact/" type="ContactPage" kruimel={[["Home", "/"], ["Contact", "/contact/"]]} />
      <section className="bg-navy pb-[60px] pt-[48px] text-white md:min-h-[1092px] md:pb-[145px] md:pt-[137px]">
        <Container className="grid items-center gap-10 md:grid-cols-[479px_479px] md:justify-between">
          <div>
            <Eyebrow kleur="text-[#f08661]">{t("Contact")}</Eyebrow>
            <H2 kleur="text-white" className="mt-3">{t("Neem contact met ons op")}</H2>
            <p className="mt-5 pb-[22px] text-white/80">{t("Heeft u vragen of wilt u een gratis inmeting plannen? Neem contact met ons op. Wij reageren snel en helder.")}</p>
            <div className="mt-[20px] flex flex-wrap gap-x-[50px] gap-y-5">
              <Lnk href="mailto:info@bartmooi.nl" className="flex items-center gap-3"><span className={rondje}><Envelop /></span><span><span className="block text-[18px] font-bold leading-[28px] text-white">{t("Email")}</span><span className="block text-[16px] leading-[24px] text-white/80">{t("info@bartmooi.nl")}</span></span></Lnk>
              <Lnk href="tel:+31614112324" className="flex items-center gap-3"><span className={rondje}><TelefoonGroot /></span><span><span className="block text-[18px] font-bold leading-[28px] text-white">{t("Telefoon")}</span><span className="block text-[16px] leading-[24px] text-white/80">06 14 11 23 24</span></span></Lnk>
            </div>
            <h3 className="mt-[50px] text-[20.8px] font-bold leading-[25px]">{t("Onze social media")}</h3>
            <div className="mt-5 flex gap-3">
              <Lnk href="https://www.facebook.com/bartmooinl/" aria-label={t("Facebook")} className="flex size-10 items-center justify-center rounded-full bg-white text-navy"><Facebook /></Lnk>
              <Lnk href="https://www.instagram.com/bartmooinl/" aria-label={t("Instagram")} className="flex size-10 items-center justify-center rounded-full bg-white text-navy"><Instagram /></Lnk>
            </div>
          </div>
          <div className="w-full max-w-[479px]">
            <Formulier l={formulierTeksten()} />
          </div>
        </Container>
      </section>

      <section className="bg-navy pb-[60px] text-white md:pb-[90px] md:pt-[0px]">
        <Container className="grid items-center gap-10 md:grid-cols-[415px_559px] md:justify-between md:pt-[90px]">
          <div className="relative mx-auto h-[300px] w-full max-w-[415px] overflow-hidden rounded-t-[207px] md:h-[430px]">
            <Image src="/img/senior-man-reading-cvv-conde-credit-card-wearing-glasses-1024x683.jpg" alt={t("Ons kantoor")} fill sizes="415px" className="object-cover" />
          </div>
          <div>
            <Eyebrow kleur="text-[#f08661]">{t("Locatie")}</Eyebrow>
            <H2 kleur="text-white" className="mt-3">{t("Ons kantoor")}</H2>
            <p className="mt-5 pb-[22px] text-white/80">{t("Kunststof kozijnen, deuren en gratis inmetingen in heel Nederland.")}</p>
            <p className="mt-2 flex items-start gap-3 font-bold text-white"><Punt />{t("Burgemeester Hovylaan 157, 2552XB 's-Gravenhage")}</p>
            <ul className="mt-3 space-y-2 text-white/80">
              <li className="flex items-center gap-3"><Mail /><Lnk href="mailto:info@bartmooi.nl">{t("info@bartmooi.nl")}</Lnk></li>
              <li className="flex items-center gap-3"><Telefoon /><Lnk href="tel:+31614112324">06 14 11 23 24</Lnk></li>
            </ul>
          </div>
        </Container>
      </section>

      <iframe title={t("Kaart")} src="https://maps.google.com/maps?q=Burgemeester%20Hovylaan%20157%2C%202552XB%20%27s-Gravenhage&t=m&z=12&output=embed&iwloc=near" className="block h-[400px] w-full border-0" loading="lazy" />
    </>
  );
}

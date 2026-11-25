import Image from "next/image";
import { Facebook, Gebouw, Instagram, Klok, Punt, Telefoon } from "./Icons";
import { Container, Lnk } from "./ui";
import { menu } from "./menu";
import { BLOG_TALEN, getTaal, href, t, TB } from "../_i18n";

export function Voet() {
  return (
    <footer className="bg-[#0a1b29] pt-[90px] text-white">
      <Container className="grid gap-10 md:grid-cols-[319px_380px_380px] md:justify-between md:gap-0">
        <div>
          <Image src="/img/logo.png" alt={t("BartMooi")} width={240} height={80} className="mx-auto h-[60px] w-auto md:mx-0 md:h-[80px]" />
          <p className="mt-[20px] max-w-[319px] text-white/80 md:h-[130px]">{t("Uw betrouwbare partner voor kunststof en aluminium kozijnen, deuren en veranda’s. Vakmanschap met jarenlange ervaring.")}</p>
          <div className="flex gap-3">
            <Lnk href="https://www.facebook.com/bartmooinl/" aria-label={t("Facebook")} className="flex size-9 items-center justify-center rounded-full bg-white text-navy"><Facebook /></Lnk>
            <Lnk href="https://www.instagram.com/bartmooinl/" aria-label={t("Instagram")} className="flex size-9 items-center justify-center rounded-full bg-white text-navy"><Instagram /></Lnk>
          </div>
        </div>
        <div>
          <h2 className="text-[20.8px] font-bold leading-[25px]">{t("Handige links")}</h2>
          <ul className="mt-[38px] text-white/80">
            {menu.filter(([, nl]) => nl !== "/blog/" || BLOG_TALEN.includes(getTaal())).map(([naam, nl]) => (<li key={nl} className="py-[8px]"><Lnk href={href(nl)}>{t(naam)}</Lnk></li>))}
          </ul>
        </div>
        <div>
          <h2 className="text-[20.8px] font-bold leading-[25px]">{t("BartMooi B.V.")}</h2>
          <ul className="mt-[38px] text-white/80 [&>li]:py-[8px]">
            <li className="flex gap-3"><Punt />{t("Burgemeester Hovylaan 157, 2552XB 's-Gravenhage")}</li>
            <li className="flex gap-3"><Klok />{t("Ma. - Vr. : 9:00 - 17:00")}</li>
            <li className="flex gap-3"><Telefoon /><Lnk href="tel:+31614112324">0614112324</Lnk></li>
            <li className="flex gap-3"><Gebouw />{t("KVK: 98506560")}</li>
          </ul>
        </div>
      </Container>
      <div className="mt-[74px] border-t border-[#13334d]">
        <Container className="flex flex-col items-center gap-2 pb-[21px] pt-[36px] text-[16px] text-white/80 md:flex-row md:justify-between md:gap-0">
          <p>{t("Copyright © 2026 Gybo Media. Alle rechten voorbehouden.")}</p>
          <Lnk href={href("/privacybeleid/")} className="text-[18px]">{t("Privacybeleid")}</Lnk>
        </Container>
      </div>
    </footer>
  );
}

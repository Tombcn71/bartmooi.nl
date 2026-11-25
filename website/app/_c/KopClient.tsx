"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Agenda, Facebook, Instagram, Klok, Mail, Telefoon } from "./Icons";
import { Lnk } from "./ui";
import { ACTIEF, PADEN, pad, type Taal } from "../_i18n/talen";

export type KopTeksten = {
  taal: Taal;
  menu: [string, string][];
  gratisRegels: [string, string];
  gratisMenu: string;
  menuLabel: string;
  openingstijden: string;
  homeHref: string;
  contactHref: string;
  donkerPaden: string[];
  taalNamen: Record<string, string>;
};

/** Zoekt bij het huidige adres het Nederlandse adres van dezelfde pagina (om de taalkeuze naar de zelfde pagina te laten wijzen). */
function nlAdres(pathname: string): string | null {
  if (pathname === "/" || PADEN["/"] && Object.values(PADEN["/"]).includes(pathname)) return "/";
  for (const [nl, perTaal] of Object.entries(PADEN)) if (nl === pathname || Object.values(perTaal).includes(pathname)) return nl;
  return null;
}

export function KopClient({ k }: { k: KopTeksten }) {
  const pathname = usePathname();
  const donker = k.donkerPaden.includes(pathname);
  const nl = nlAdres(pathname);
  const wissel = ACTIEF.length > 1 ? ACTIEF.map((x) => ({ taal: x, href: nl ? pad(nl, x) : x === "nl" ? "/" : `/${x}/` })) : [];
  return (
    <header className="sticky top-0 z-50">
      <div className="hidden h-12 bg-navy text-white md:block">
        <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between">
          <ul className="flex items-center">
            {[
              [<Klok key="k" />, k.openingstijden],
              [<Telefoon key="t" />, "0614112324"],
              [<Mail key="m" />, "info@bartmooi.nl"],
            ].map(([icoon, tekst], i) => (
              <li key={i} className={`flex h-6 items-center gap-2 ${i > 0 ? "ml-4 border-l border-white/25 pl-4" : ""}`}>
                {icoon}
                <span>{tekst}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            {wissel.length > 0 && (
              <ul className="mr-2 flex gap-3 text-[14px] font-bold uppercase tracking-[1.6px]">
                {wissel.map((w) => (<li key={w.taal}><Lnk href={w.href} hrefLang={w.taal} aria-label={k.taalNamen[w.taal]} aria-current={w.taal === k.taal ? "true" : undefined} className={w.taal === k.taal ? "text-white" : "text-white/60 hover:text-white"}>{w.taal}</Lnk></li>))}
              </ul>
            )}
            <Lnk href="https://www.facebook.com/bartmooinl/" aria-label="Facebook" className="flex size-7 items-center justify-center rounded-full bg-white/15 text-white"><Facebook /></Lnk>
            <Lnk href="https://www.instagram.com/bartmooinl/" aria-label="Instagram" className="flex size-7 items-center justify-center rounded-full bg-white/15 text-white"><Instagram /></Lnk>
          </div>
        </div>
      </div>
      <div className={`bg-white ${donker ? "md:bg-navy" : "md:bg-licht"}`}>
        <nav className="relative mx-auto flex h-[106px] max-w-[1140px] items-center justify-between px-4 md:h-[96px] md:justify-start md:px-0">
          <Lnk href={k.homeHref} aria-label="BartMooi"><Image src="/img/logo.png" alt="BartMooi" width={179} height={60} priority className="h-[69px] w-auto md:h-[60px]" /></Lnk>
          <details className="md:hidden">
            <summary aria-label={k.menuLabel} className="flex size-[45px] cursor-pointer list-none items-center justify-center bg-blauw/10 text-blauw [&::-webkit-details-marker]:hidden">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" /></svg>
            </summary>
            <ul className="absolute inset-x-0 top-[106px] z-30 bg-white px-4 py-2 text-[17.6px] font-semibold shadow-lg">
              {k.menu.map(([naam, href]) => (<li key={href}><Lnk href={href} className="block py-3 text-zwart">{naam}</Lnk></li>))}
              <li><Lnk href={k.contactHref} className="mt-2 block bg-blauw/10 py-3 text-center text-[14px] font-bold uppercase tracking-[1.6px] text-blauw">{k.gratisMenu}</Lnk></li>
              {wissel.length > 0 && (
                <li className="flex justify-center gap-6 py-3 text-[14px] font-bold uppercase tracking-[1.6px]">
                  {wissel.map((w) => (<Lnk key={w.taal} href={w.href} hrefLang={w.taal} aria-label={k.taalNamen[w.taal]} aria-current={w.taal === k.taal ? "true" : undefined} className={w.taal === k.taal ? "text-blauw" : "text-zwart/60"}>{w.taal}</Lnk>))}
                </li>
              )}
            </ul>
          </details>
          <ul className={`ml-[42px] hidden gap-10 text-[17.6px] font-semibold leading-[22.88px] text-zwart ${donker ? "md:text-white" : ""} md:flex`}>
            {k.menu.map(([naam, href]) => (<li key={href}><Lnk href={href} className="block py-[13px]">{naam}</Lnk></li>))}
          </ul>
          <Lnk href={k.contactHref} className={`ml-auto hidden h-14 w-[190px] items-center justify-center gap-4 text-[14px] font-bold uppercase leading-[14px] tracking-[1.6px] md:flex ${donker ? "bg-[#0a769f] text-white" : "bg-blauw/10 text-blauw"}`}>
            <Agenda />
            <span className="text-center">{k.gratisRegels[0]}<br />{k.gratisRegels[1]}</span>
          </Lnk>
        </nav>
      </div>
    </header>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { getTaal } from "../_i18n/stand";
import { pad } from "../_i18n/talen";

export const Eyebrow = ({ children, kleur = "text-oranje-tekst", className = "" }: { children: ReactNode; kleur?: string; className?: string }) => (
  <p className={`text-[16px] font-semibold uppercase leading-[21px] tracking-[2.4px] ${kleur} ${className}`}>{children}</p>
);

export const H2 = ({ children, kleur = "text-zwart", className = "", as: Tag = "h2" }: { children: ReactNode; kleur?: string; className?: string; as?: "h1" | "h2" | "h3" }) => (
  <Tag className={`text-[34px] font-bold leading-[1.2] tracking-[-1.2px] md:text-[48px] md:tracking-[-1.8px] ${kleur} ${className}`}>{children}</Tag>
);

export const Blauw = ({ children }: { children: ReactNode }) => <span className="text-kop">{children}</span>;

export const Knop = ({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) => (
  <Lnk href={href} className={`inline-flex h-[46px] items-center justify-center bg-blauw px-[30px] text-[14px] font-bold uppercase leading-[14px] tracking-[1.6px] text-white ${className}`}>{children}</Lnk>
);

export const Container = ({ children, className = "", breed = false }: { children: ReactNode; className?: string; breed?: boolean }) => (
  <div className={twMerge("mx-auto w-full px-4 md:px-0", breed ? "max-w-[1220px]" : "max-w-[1140px]", className)}>{children}</div>
);

export const Vinkje = () => (
  <span className="flex size-[44px] shrink-0 items-center justify-center rounded-full bg-blauw/10">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#1e5079" aria-hidden><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1.5 14.5l-4-4 1.4-1.4 2.600 2.600 5.600-5.600 1.400 1.400-7 7z" /></svg>
  </span>
);

/** Interne adressen gaan via Next.js (snel doorklikken, vooraf laden); externe, tel: en mailto: blijven gewone links. */
export function Lnk({ href: nlHref, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  // Adressen van onze eigen pagina’s gaan automatisch naar de taalversie van de pagina waar je op zit.
  const href = nlHref.startsWith("/") ? pad(nlHref, getTaal()) : nlHref;
  const intern = href.startsWith("/") || href.startsWith("#");
  if (intern) return <Link href={href} prefetch={false} {...rest}>{children}</Link>;
  const extern = /^https?:/.test(href);
  return <a href={href} {...(extern ? { target: "_blank", rel: "noopener" } : {})} {...rest}>{children}</a>;
}

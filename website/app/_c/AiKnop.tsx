"use client";

import { useEffect, useRef, useState } from "react";
import { Ster } from "./Icons";

const HOST = "https://offerte.bartmooi.nl";

/** De knop "Prijs & advies direct": opent de AI-assistent van BartMooi in een venster (op de telefoon beeldvullend). */
export type AiTeksten = { titel: string; ondertitel: string; knopTekst: string; venster: string; taal: string };

export function AiKnop({ onderwerp, variant = "groot", l }: { onderwerp?: string; variant?: "groot" | "tekst"; l: AiTeksten }) {
  const [open, setOpen] = useState(false);
  const [geladen, setGeladen] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const luister = (e: MessageEvent) => {
      if (e.origin === HOST && e.data && e.data.bmChat === "sluit") setOpen(false);
    };
    window.addEventListener("message", luister);
    return () => window.removeEventListener("message", luister);
  }, []);

  const wissel = () => {
    setGeladen(true);
    setOpen((o) => !o);
  };

  if (variant === "tekst") {
    return (
      <>
        <button type="button" onClick={wissel} className="inline-flex h-[46px] items-center gap-3 bg-blauw px-[30px] text-[14px] font-bold uppercase tracking-[1.6px] text-white">
          <Ster /> {l.knopTekst}
        </button>
        {geladen && (
          <iframe title={l.venster} allow="microphone" src={`${HOST}/chat?ingebed=1&lang=${l.taal}${onderwerp ? `&topic=${encodeURIComponent(onderwerp)}` : ""}`} className={`fixed inset-0 z-[2147483000] h-full w-full border-0 bg-white sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(520px,calc(100vh-40px))] sm:w-[340px] sm:rounded-2xl sm:shadow-[0_10px_40px_rgba(0,0,0,.3)] ${open ? "block" : "hidden"}`} />
        )}
      </>
    );
  }
  return (
    <>
      <div className="mt-[50px] w-full max-w-[420px] md:w-[420px]">
        <div
          role="button"
          tabIndex={0}
          onClick={wissel}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && wissel()}
          className="ai-knop relative flex cursor-pointer items-center gap-[13px] overflow-hidden rounded-[10px] bg-blauw py-3 pl-3 pr-[18px] text-left text-white md:gap-4 md:pl-3.5 md:pr-9"
        >
          <span className="relative z-10 flex size-[42px] shrink-0 items-center justify-center rounded-full bg-white text-blauw"><Ster /></span>
          <span className="relative z-10 block">
            <b className="block text-[15px] font-bold uppercase leading-[1.2] tracking-[0.1em] md:text-[16px] md:tracking-[0.15em]">{l.titel}</b>
            <small className="mt-1 block text-[12.5px] font-normal leading-[1.2] opacity-90 md:text-[13px]">{l.ondertitel}</small>
          </span>
        </div>
      </div>
      {geladen && (
        <iframe
          ref={frame}
          title={l.venster}
          allow="microphone"
          src={`${HOST}/chat?ingebed=1&lang=${l.taal}${onderwerp ? `&topic=${encodeURIComponent(onderwerp)}` : ""}`}
          className={`fixed inset-0 z-[2147483000] h-full w-full border-0 bg-white sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(520px,calc(100vh-40px))] sm:w-[340px] sm:rounded-2xl sm:shadow-[0_10px_40px_rgba(0,0,0,.3)] ${open ? "block" : "hidden"}`}
        />
      )}
    </>
  );
}

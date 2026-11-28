"use client";
import { useEffect, useState } from "react";
import { Smartphone, X } from "lucide-react";

type InstallPrompt = Event & { prompt: () => Promise<void> };
const WEG = "bm-install-weg";

/** Na de eerste keer inloggen: uitleg hoe je de app op je beginscherm zet (Pools of Nederlands). */
export function Installeren({ pl }: { pl: boolean }) {
  const [toon, setToon] = useState<null | "ios" | "anders">(null);
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);

  useEffect(() => {
    const los = matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
    let weg = false;
    try { weg = localStorage.getItem(WEG) === "1"; } catch {}
    if (!los && !weg) setToon(/iphone|ipad|ipod/i.test(navigator.userAgent) ? "ios" : "anders");
    const f = (e: Event) => { e.preventDefault(); setPrompt(e as InstallPrompt); };
    addEventListener("beforeinstallprompt", f);
    return () => removeEventListener("beforeinstallprompt", f);
  }, []);

  const sluit = () => { setToon(null); try { localStorage.setItem(WEG, "1"); } catch {} };
  if (!toon) return null;

  const L = pl
    ? { titel: "Dodaj aplikację do ekranu głównego", tekst: "Wtedy otworzysz ją jednym dotknięciem, jak zwykłą aplikację.", knop: "Zainstaluj aplikację", ios: "W Safari dotknij na dole Udostępnij (kwadrat ze strzałką), a potem „Do ekranu początkowego”.", anders: "W menu przeglądarki (⋮) wybierz „Zainstaluj aplikację” lub „Dodaj do ekranu głównego”." }
    : { titel: "Zet de app op je beginscherm", tekst: "Dan open je hem met één tik, net als een gewone app.", knop: "Installeer de app", ios: "Tik in Safari onderin op Delen (het vierkantje met de pijl) en kies ‘Zet op beginscherm’.", anders: "Kies in het menu van je browser (⋮) ‘App installeren’ of ‘Toevoegen aan startscherm’." };

  return (
    <div className="mx-auto max-w-md px-4 pt-3">
      <div className="flex gap-3 rounded-2xl border border-[#1E5079]/20 bg-blue-50 p-4">
        <Smartphone className="mt-0.5 size-5 shrink-0 text-[#1E5079]" />
        <div className="flex-1 text-sm">
          <p className="font-bold">{L.titel}</p>
          <p className="mt-1 text-slate-600">{L.tekst}</p>
          {prompt ? (
            <button onClick={async () => { await prompt.prompt(); sluit(); }} className="mt-3 rounded-xl bg-[#1E5079] px-4 py-2 font-bold text-white">{L.knop}</button>
          ) : (
            <p className="mt-2 font-medium text-slate-700">{toon === "ios" ? L.ios : L.anders}</p>
          )}
        </div>
        <button onClick={sluit} aria-label="Sluiten" className="self-start p-1 text-slate-500"><X className="size-4" /></button>
      </div>
    </div>
  );
}

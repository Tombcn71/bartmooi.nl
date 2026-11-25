import type { ReactNode } from "react";
import { HTML_TAAL, setTaal, t, type Taal } from "../_i18n";
import { overpass, overpassPl } from "./lettertype";
import { Kop } from "./Kop";
import { Voet } from "./Voet";
import { OnthulScript } from "./Onthul";

/** De hele pagina: <html lang> in de juiste taal, kop, inhoud en voet. Elke taalmap heeft zijn eigen root-layout. */
export function Wortel({ taal, children }: { taal: Taal; children: ReactNode }) {
  setTaal(taal);
  return (
    <html lang={HTML_TAAL[taal]} className={(taal === "pl" ? overpassPl : overpass).variable}>
      <body className="bg-white font-sans text-[18px] leading-[27px] text-tekst antialiased">
        <a href="#inhoud" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:bg-white focus:p-3 focus:text-zwart">{t("Naar de inhoud")}</a>
        <Kop />
        <main id="inhoud">{children}</main>
        <Voet />
        <OnthulScript />
      </body>
    </html>
  );
}

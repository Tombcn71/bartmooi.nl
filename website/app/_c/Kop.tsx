import { BLOG_TALEN, PADEN, getTaal, href, t } from "../_i18n";
import { KopClient } from "./KopClient";
import { menu } from "./menu";

/** Kop van de site: bouwt de teksten en adressen in de taal van de pagina en geeft ze aan de (klik-)kop. */
export function Kop() {
  const taal = getTaal();
  return (
    <KopClient
      k={{
        taal,
        menu: menu.filter(([, nl]) => nl !== "/blog/" || BLOG_TALEN.includes(taal)).map(([naam, nl]) => [t(naam), href(nl)]),
        gratisRegels: [t("Gratis"), t("inmeting")],
        gratisMenu: t("Gratis inmeting"),
        menuLabel: t("Menu"),
        openingstijden: t("Ma. - Vr. : 9:00 - 17:00"),
        homeHref: href("/"),
        contactHref: href("/contact/"),
        donkerPaden: ["/contact/", ...Object.values(PADEN["/contact/"] ?? {})],
        taalNamen: { nl: "Nederlands", en: "English", de: "Deutsch", pl: "Polski" },
      }}
    />
  );
}

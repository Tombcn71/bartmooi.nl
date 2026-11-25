import { Privacybeleid } from "../../../_paginas/Privacybeleid";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/privacybeleid/", "en");

export default function Pagina() {
  setTaal("en");
  return <Privacybeleid />;
}

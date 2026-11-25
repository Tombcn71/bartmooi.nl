import { Privacybeleid } from "../../../_paginas/Privacybeleid";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/privacybeleid/", "de");

export default function Pagina() {
  setTaal("de");
  return <Privacybeleid />;
}

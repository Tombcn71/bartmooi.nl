import { Privacybeleid } from "../../_paginas/Privacybeleid";
import { meta } from "../../_c/seo";
import { setTaal } from "../../_i18n";

export const metadata = meta("/privacybeleid/");

export default function Pagina() {
  setTaal("nl");
  return <Privacybeleid />;
}

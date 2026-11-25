import { Bedankt } from "../../../_paginas/Bedankt";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/bedankt/", "de", { robots: { index: false } });

export default function Pagina() {
  setTaal("de");
  return <Bedankt />;
}

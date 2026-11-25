import { Bedankt } from "../../../_paginas/Bedankt";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/bedankt/", "en", { robots: { index: false } });

export default function Pagina() {
  setTaal("en");
  return <Bedankt />;
}

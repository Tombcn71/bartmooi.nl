import { OverOns } from "../../../_paginas/OverOns";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/over-ons/", "en");

export default function Pagina() {
  setTaal("en");
  return <OverOns />;
}

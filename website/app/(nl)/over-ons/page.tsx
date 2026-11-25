import { OverOns } from "../../_paginas/OverOns";
import { meta } from "../../_c/seo";
import { setTaal } from "../../_i18n";

export const metadata = meta("/over-ons/");

export default function Pagina() {
  setTaal("nl");
  return <OverOns />;
}

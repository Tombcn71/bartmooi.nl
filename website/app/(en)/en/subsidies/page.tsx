import { Subsidie } from "../../../_paginas/Subsidie";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/subsidie/", "en");

export default function Pagina() {
  setTaal("en");
  return <Subsidie />;
}

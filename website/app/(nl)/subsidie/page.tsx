import { Subsidie } from "../../_paginas/Subsidie";
import { meta } from "../../_c/seo";
import { setTaal } from "../../_i18n";

export const metadata = meta("/subsidie/");

export default function Pagina() {
  setTaal("nl");
  return <Subsidie />;
}

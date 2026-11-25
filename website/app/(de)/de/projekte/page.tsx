import { Projecten } from "../../../_paginas/Projecten";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/projecten/", "de");

export default function Pagina() {
  setTaal("de");
  return <Projecten />;
}

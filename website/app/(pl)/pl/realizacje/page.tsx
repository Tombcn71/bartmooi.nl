import { Projecten } from "../../../_paginas/Projecten";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/projecten/", "pl");

export default function Pagina() {
  setTaal("pl");
  return <Projecten />;
}

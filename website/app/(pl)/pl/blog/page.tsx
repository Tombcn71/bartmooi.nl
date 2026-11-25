import { Blog } from "../../../_paginas/Blog";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/blog/", "pl");

export default function Pagina() {
  setTaal("pl");
  return <Blog />;
}

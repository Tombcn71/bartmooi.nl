import { Blog } from "../../../_paginas/Blog";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/blog/", "de");

export default function Pagina() {
  setTaal("de");
  return <Blog />;
}

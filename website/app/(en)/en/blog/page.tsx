import { Blog } from "../../../_paginas/Blog";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/blog/", "en");

export default function Pagina() {
  setTaal("en");
  return <Blog />;
}

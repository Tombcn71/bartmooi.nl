import { Reviews } from "../../../_paginas/Reviews";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/reviews/", "de");

export default function Pagina() {
  setTaal("de");
  return <Reviews />;
}

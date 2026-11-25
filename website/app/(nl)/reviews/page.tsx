import { Reviews } from "../../_paginas/Reviews";
import { meta } from "../../_c/seo";
import { setTaal } from "../../_i18n";

export const metadata = meta("/reviews/");

export default function Pagina() {
  setTaal("nl");
  return <Reviews />;
}

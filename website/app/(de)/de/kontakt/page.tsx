import { Contact } from "../../../_paginas/Contact";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/contact/", "de");

export default function Pagina() {
  setTaal("de");
  return <Contact />;
}

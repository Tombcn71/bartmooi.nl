import { Contact } from "../../../_paginas/Contact";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/contact/", "pl");

export default function Pagina() {
  setTaal("pl");
  return <Contact />;
}

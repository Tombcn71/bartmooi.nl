import { Home } from "../_paginas/Home";
import { meta } from "../_c/seo";
import { setTaal } from "../_i18n";

export const metadata = meta("/");

export default function Pagina() {
  setTaal("nl");
  return <Home />;
}

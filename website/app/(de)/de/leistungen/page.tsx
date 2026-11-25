import { Diensten } from "../../../_paginas/Diensten";
import { meta } from "../../../_c/seo";
import { setTaal } from "../../../_i18n";

export const metadata = meta("/diensten/", "de");

export default function Pagina() {
  setTaal("de");
  return <Diensten />;
}

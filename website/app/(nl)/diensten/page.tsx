import { Diensten } from "../../_paginas/Diensten";
import { meta } from "../../_c/seo";
import { setTaal } from "../../_i18n";

export const metadata = meta("/diensten/");

export default async function Pagina() {
  setTaal("nl");
  return <Diensten />;
}

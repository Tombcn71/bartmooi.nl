import { headers } from "next/headers";
import { naarTaal, vertaal, type Taal } from "./taal";

/** Taal van de klant in servercode (pagina's en acties); zonder taal Nederlands. */
export async function getTaal(): Promise<Taal> {
  return naarTaal((await headers()).get("x-bm-taal"));
}

export async function getT() {
  const taal = await getTaal();
  return (tekst: string, waarden?: Record<string, string | number>) => vertaal(taal, tekst, waarden);
}

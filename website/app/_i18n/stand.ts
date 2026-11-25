import { cache } from "react";
import type { Taal } from "./talen";

// De taal van de pagina die nu wordt opgebouwd (per verzoek). In de browser is er geen taalstand; daar zijn de adressen al in de goede taal gezet.
const stand: () => { taal: Taal } = typeof cache === "function" ? cache(() => ({ taal: "nl" as Taal })) : () => ({ taal: "nl" as Taal });
export const setTaal = (taal: Taal) => {
  stand().taal = taal;
};
export const getTaal = (): Taal => stand().taal;

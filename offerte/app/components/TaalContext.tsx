"use client";
import { createContext, useCallback, useContext } from "react";
import { vertaal, type Taal } from "@/lib/taal";

const TaalContext = createContext<Taal>("nl");

export function TaalProvider({ taal, children }: { taal: Taal; children: React.ReactNode }) {
  return <TaalContext.Provider value={taal}>{children}</TaalContext.Provider>;
}

export const useTaal = () => useContext(TaalContext);

/** t("Nederlandse tekst") geeft de tekst in de taal van de klant. */
export function useT() {
  const taal = useTaal();
  return useCallback((tekst: string, waarden?: Record<string, string | number>) => vertaal(taal, tekst, waarden), [taal]);
}

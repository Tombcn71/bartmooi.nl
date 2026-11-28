"use client";
import dynamic from "next/dynamic";

// Alleen in de browser: de app leest datums en lokale opslag.
const App = dynamic(() => import("./app"), { ssr: false });
export default function Pagina() {
  return <App />;
}

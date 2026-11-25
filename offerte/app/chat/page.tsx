import Chat, { type Taal } from "./ChatClient";

// Tijdelijk alleen Nederlands (presentatie). Zet ANDERE_TALEN_AAN op true om en, de en pl weer te openen.
const ANDERE_TALEN_AAN = false;
const TALEN = ANDERE_TALEN_AAN ? ["nl", "en", "de", "pl"] : ["nl"];

export default async function Pagina({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  const taal = (TALEN.includes(lang ?? "") ? lang : "nl") as Taal;
  return <Chat taal={taal} />;
}

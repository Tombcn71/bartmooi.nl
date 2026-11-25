import Chat, { type Taal } from "./ChatClient";

const TALEN = ["nl", "en", "de", "pl"];

export default async function Pagina({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  const taal = (TALEN.includes(lang ?? "") ? lang : "nl") as Taal;
  return <Chat taal={taal} />;
}

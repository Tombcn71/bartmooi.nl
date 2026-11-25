const slug = (t: string) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/<[^>]+>/g, "").replace(/&amp;/g, "en").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const INHOUD = ["inhoudsopgave", "contents", "inhalt", "inhaltsverzeichnis", "spis-tresci"];

/** Geeft elke kop een eigen adres (#kop-naam) en laat de inhoudsopgave daarnaartoe wijzen. */
export function ankers(html: string): string {
  html = html.replace(/<a [^>]*>(?:\s|&nbsp;|<[^a>][^>]*>|<\/[^a>][^>]*>)*<\/a>/g, "");
  const koppen = [...html.matchAll(/<h2>(?:<strong>)?(.*?)(?:<\/strong>)?<\/h2>/g)].map((m) => m[1].trim());
  const ids = new Map(koppen.filter((k) => !INHOUD.includes(slug(k))).map((k) => [slug(k), slug(k)]));
  let uit = html.replace(/<h2>((?:<strong>)?(.*?)(?:<\/strong>)?)<\/h2>/g, (m, binnen, tekst) => (INHOUD.includes(slug(tekst)) ? m : `<h2 id="${slug(tekst)}">${binnen}</h2>`));
  uit = uit.replace(/<a href="[^"]*#\d+">(.*?)<\/a>/g, (m, tekst) => {
    const sl = slug(tekst);
    const doel = ids.has(sl) ? sl : [...ids.keys()].find((k) => k.startsWith(sl));
    return doel ? `<a href="#${doel}">${tekst}</a>` : m;
  });
  return uit;
}

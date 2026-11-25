import { feiten, posts, zonderHtml } from "../_content/tekst";

// Volledige tekst van de artikelen, zodat AI-assistenten ze zonder de website zelf kunnen lezen.
export function GET() {
  const tekst = `# BartMooi: volledige tekst\n\n${feiten}\n\n${posts
    .map((p) => `\n---\n\n# ${p.titel}\n\nBron: https://bartmooi.nl/${p.slug}/ · Gepubliceerd: ${p.datum}\n\n${zonderHtml(p.html)}`)
    .join("\n")}\n`;
  return new Response(tekst, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

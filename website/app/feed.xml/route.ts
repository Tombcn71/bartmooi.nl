import { posts } from "../_content/posts";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = posts
    .map((p) => `<item><title>${esc(p.titel)}</title><link>https://www.bartmooi.nl/${p.slug}/</link><guid isPermaLink="true">https://www.bartmooi.nl/${p.slug}/</guid><pubDate>${new Date(p.datum).toUTCString()}</pubDate><description>${esc(p.uittreksel)}…</description></item>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>BartMooi: tips en nieuws over kozijnen</title><link>https://www.bartmooi.nl/blog/</link><description>Tips en nieuws over kozijnen, deuren, isolatie en subsidies.</description><language>nl-NL</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}

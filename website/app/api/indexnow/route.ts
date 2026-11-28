import { posts } from "../../_content/posts";

const SITE = "https://www.bartmooi.nl";
// De IndexNow-sleutel is openbaar: hij staat ook als bestand in /public (/<sleutel>.txt), zodat Bing kan controleren dat de site van ons is.
const INDEXNOW_SLEUTEL = "b4d7a2c91e5f4a60b8c3d1e2f7a9b6c5";

/** Meldt adressen aan bij IndexNow (Bing, en daarmee onder meer ChatGPT Search en Copilot, Yandex, Seznam). */
export async function stuurNaarIndexNow(paden: string[]) {
  const urlList = paden.map((p) => (p.startsWith("http") ? p : `${SITE}${p}`));
  const r = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: "www.bartmooi.nl", key: INDEXNOW_SLEUTEL, keyLocation: `${SITE}/${INDEXNOW_SLEUTEL}.txt`, urlList }),
  }).catch(() => null);
  return { status: r?.status ?? 0, aantal: urlList.length };
}

// POST /api/indexnow/?token=GEHEIM            -> alle pagina's aanmelden
// POST /api/indexnow/?token=GEHEIM&pad=/x/    -> één pagina aanmelden
export async function POST(req: Request) {
  const u = new URL(req.url);
  if (!process.env.REVALIDATE_TOKEN || u.searchParams.get("token") !== process.env.REVALIDATE_TOKEN) return Response.json({ fout: "Geen toegang." }, { status: 401 });
  const pad = u.searchParams.get("pad");
  const alle = ["/", "/diensten/", "/over-ons/", "/subsidie/", "/projecten/", "/reviews/", "/contact/", "/blog/", ...posts.map((p) => `/${p.slug}/`)];
  return Response.json(await stuurNaarIndexNow(pad ? [pad] : alle));
}

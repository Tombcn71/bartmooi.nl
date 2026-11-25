import { feiten, posts } from "../_content/tekst";

// Samenvatting voor AI-zoekmachines en assistenten (llms.txt).
export function GET() {
  const tekst = `# BartMooi

> Kunststof en aluminium kozijnen, deuren en zonwering op maat, met gratis inmeting en montage. Duitse kwaliteit, Poolse prijzen. Voor particulieren en VvE’s in Nederland.

${feiten}

## Pagina’s

- [Diensten](https://bartmooi.nl/diensten/): kunststof en aluminium kozijnen, deuren, schuifpuien, rolluiken, binnenzonwering en horren, aluminium veranda’s; werkwijze in 5 stappen
- [Subsidie](https://bartmooi.nl/subsidie/): hulp bij subsidie voor kozijnen en HR+++ glas, wie in aanmerking komt
- [Projecten](https://bartmooi.nl/projecten/): gerealiseerde projecten in Den Haag en omgeving
- [Reviews](https://bartmooi.nl/reviews/): ervaringen van klanten
- [Over ons](https://bartmooi.nl/over-ons/): het verhaal achter BartMooi, sinds 2007
- [Contact](https://bartmooi.nl/contact/): contactformulier, adres en kaart

## Artikelen

${posts.map((p) => `- [${p.titel}](https://bartmooi.nl/${p.slug}/): ${p.uittreksel}…`).join("\n")}

## Meer

- [Volledige tekst voor AI](https://bartmooi.nl/llms-full.txt)
- [Sitemap](https://bartmooi.nl/sitemap.xml)
`;
  return new Response(tekst, { headers: { "content-type": "text/plain; charset=utf-8" } });
}

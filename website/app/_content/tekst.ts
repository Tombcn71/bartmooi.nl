import { posts } from "./posts";

export const zonderHtml = (h: string) =>
  h.replace(/<li>/g, "\n- ").replace(/<\/(p|h2|h3|ul|ol)>/g, "\n\n").replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\n{3,}/g, "\n\n").trim();

export const feiten = `BartMooi B.V. is een kozijnenbedrijf in Den Haag. Het bedrijf levert en monteert kunststof en aluminium kozijnen, buiten- en binnendeuren, schuifpuien en harmonicadeuren, rolluiken, binnenzonwering en horren en aluminium veranda’s, op maat. Gratis inmeting, persoonlijke offerte, productie op maat en montage door eigen monteurs. Voor particulieren en VvE’s in heel Nederland.

- Adres: Burgemeester Hovylaan 157, 2552 XB ’s-Gravenhage
- Telefoon: 06 14 11 23 24 (+31 6 14 11 23 24)
- E-mail: info@bartmooi.nl
- Openingstijden: maandag t/m vrijdag 09:00 - 17:00
- KvK: 98506560
- Website: https://www.bartmooi.nl/`;

export { posts };

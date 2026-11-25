// Verstuurt een bericht uit het contactformulier per e-mail (Resend).
// Stel in via omgevingsvariabelen: RESEND_API_KEY, CONTACT_VAN (verzendadres van een geverifieerd domein), CONTACT_NAAR (ontvanger).
import { vertaal, TALEN, type Taal } from "../../_i18n";

const tekst = (v: unknown, max: number) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(req: Request) {
  const d = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const taal = (TALEN as string[]).includes(String(d.taal)) ? (d.taal as Taal) : "nl";
  const fout = (m: string, status: number) => Response.json({ fout: vertaal(taal, m) }, { status });
  if (d.website) return Response.json({ ok: true }); // verborgen veld ingevuld: waarschijnlijk een robot

  const voornaam = tekst(d.voornaam, 80);
  const achternaam = tekst(d.achternaam, 80);
  const email = tekst(d.email, 120);
  const telefoon = tekst(d.telefoon, 40);
  const bericht = String(d.bericht ?? "").trim().slice(0, 4000);
  if (!voornaam || !achternaam || !bericht || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || telefoon.replace(/\D/g, "").length < 8) {
    return fout("Controleer of alle velden goed zijn ingevuld.", 400);
  }

  const sleutel = process.env.RESEND_API_KEY;
  const van = process.env.CONTACT_VAN;
  const naar = process.env.CONTACT_NAAR;
  if (!sleutel || !van || !naar) {
    return fout("Het formulier is nog niet gekoppeld aan e-mail. Bel of mail ons gerust: 06 14 11 23 24, info@bartmooi.nl.", 503);
  }

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${sleutel}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: `BartMooi website <${van}>`,
      to: [naar],
      reply_to: email,
      subject: `Nieuw bericht van ${voornaam} ${achternaam}`,
      text: `Naam: ${voornaam} ${achternaam}\nE-mail: ${email}\nTelefoon: ${telefoon}\n\n${bericht}`,
    }),
  });
  if (!r.ok) return fout("Versturen mislukt. Probeer het later opnieuw of bel ons.", 502);
  return Response.json({ ok: true });
}

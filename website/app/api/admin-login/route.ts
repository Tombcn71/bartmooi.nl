// Inlog van Bart op bartmooi.nl/admin. Zet dezelfde cookie als de offerte-app (admin_token),
// maar dan voor heel *.bartmooi.nl, zodat hij daarna ook in offerte.bartmooi.nl/admin binnen is.
import { cookies } from "next/headers";

const DOMEIN = process.env.NODE_ENV === "production" ? ".bartmooi.nl" : undefined;

export async function GET() {
  const t = (await cookies()).get("admin_token")?.value;
  return Response.json({ ingelogd: !!process.env.ADMIN_TOKEN && t === process.env.ADMIN_TOKEN });
}

export async function POST(req: Request) {
  const { wachtwoord } = (await req.json().catch(() => ({}))) as { wachtwoord?: string };
  const goed = process.env.ADMIN_PASSWORD;
  const token = process.env.ADMIN_TOKEN;
  if (!goed || !token) return Response.json({ fout: "Niet ingesteld." }, { status: 503 });
  if (wachtwoord !== goed) return Response.json({ fout: "Wachtwoord klopt niet." }, { status: 401 });
  (await cookies()).set("admin_token", token, { domain: DOMEIN, path: "/", httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 90 });
  return Response.json({ ok: true });
}

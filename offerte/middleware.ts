import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TALEN = ["nl", "en", "de", "pl"];
const TAAL_COOKIE = "bm_taal";

function withPathname(response: NextResponse, pathname: string) {
  response.headers.set("x-pathname", pathname);
  return response;
}

export function middleware(request: NextRequest) {
  const res = kern(request);
  // Taal van de klant: ?lang=en|de|pl|nl wordt onthouden, zodat de hele calculator in die taal blijft.
  const lang = request.nextUrl.searchParams.get("lang");
  if (lang && TALEN.includes(lang) && !request.nextUrl.pathname.startsWith("/admin"))
    res.cookies.set(TAAL_COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
  return res;
}

function kern(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  // Ook voor deze eerste pagina al de juiste taal: zet de taal alvast in de cookies van het verzoek zelf.
  const lang = url.searchParams.get("lang");
  const geef = { request: { headers: new Headers(request.headers) } };
  // Het beheer (/admin) krijgt nooit een taal mee en blijft dus altijd Nederlands.
  const taal = lang && TALEN.includes(lang) ? lang : request.cookies.get(TAAL_COOKIE)?.value;
  if (taal && TALEN.includes(taal)) geef.request.headers.set("x-bm-taal", taal);

  // 1. Admin routes — auth check
  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin/login") {
      const token = request.cookies.get("admin_token")?.value;
      if (token !== process.env.ADMIN_TOKEN) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
    return withPathname(NextResponse.next(), pathname);
  }

  // 2. Aluminium configurators — direct
  if (pathname.startsWith("/aluminium")) {
    return withPathname(NextResponse.next(geef), pathname);
  }

  // 3. Accepteer + offerte pagina — direct (niet herschrijven)
  if (pathname.startsWith("/accepteer") || pathname.startsWith("/offerte") || pathname.startsWith("/terugbellen") || pathname.startsWith("/meten") || pathname.startsWith("/test-assistent") || pathname === "/widget" || pathname === "/chat") {
    return withPathname(NextResponse.next(geef), pathname);
  }

  // Testpagina (nagemaakte bartmooi.nl hero) op korte url
  if (pathname === "/test") {
    url.pathname = "/test.html";
    return NextResponse.rewrite(url);
  }

  // 3. Alle overige routes → configurators
  url.pathname =
    pathname === "/" ? "/configurators" : `/configurators${pathname}`;
  return withPathname(NextResponse.rewrite(url, geef), pathname);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)"],
};

import { NextResponse, type NextRequest } from "next/server";

/** kantoor.bartmooi.nl toont de kantoor-app die in deze site staat (/kantoor). */
export function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  if (!host.startsWith("kantoor.")) return NextResponse.next();
  const url = req.nextUrl.clone();
  if (!url.pathname.startsWith("/kantoor")) url.pathname = "/kantoor" + (url.pathname === "/" ? "/" : url.pathname);
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!_next/|api/|favicon|icon|img/).*)"] };

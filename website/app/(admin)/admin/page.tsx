"use client";
import { useEffect, useState } from "react";

/** bartmooi.nl/admin: Bart logt hier één keer in en kiest daarna Kantoor of Offertes. */
const TEGELS = [
  { href: "https://bartmooi-kantoor.vercel.app/#kantoor", titel: "Kantoor", tekst: "Planning, uren, facturen en je team.", pad: "M4 7h16v12H4zM9 7V5h6v2" },
  { href: "https://offerte.bartmooi.nl/admin/offertes", titel: "Offertes", tekst: "Aanvragen, offertes maken en prijzen.", pad: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" },
];

export default function Admin() {
  const [status, setStatus] = useState<"laden" | "uit" | "in">("laden");
  const [wachtwoord, setWachtwoord] = useState("");
  const [fout, setFout] = useState("");

  useEffect(() => {
    fetch("/api/admin-login/").then((r) => r.json()).then((d) => setStatus(d.ingelogd ? "in" : "uit")).catch(() => setStatus("uit"));
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setFout("");
    const r = await fetch("/api/admin-login/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ wachtwoord }) });
    if (r.ok) setStatus("in");
    else setFout("Wachtwoord klopt niet.");
  }

  return (
    <>
      <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 md:h-20 md:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://offerte.bartmooi.nl/bartmooi-logo-1.png" alt="BartMooi" className="h-9 w-auto md:h-11" />
      </header>
      <main className="mx-auto flex max-w-md flex-col gap-4 p-4 pt-8 md:pt-16">
        {status === "uit" && (
          <form onSubmit={login} className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
            <h1 className="text-xl font-bold">Inloggen</h1>
            <input type="password" autoFocus autoComplete="current-password" value={wachtwoord} onChange={(e) => setWachtwoord(e.target.value)} placeholder="Wachtwoord" className="w-full rounded-xl border border-slate-300 p-3 text-base outline-none focus:border-[#1E5079]" />
            {fout && <p className="text-sm font-semibold text-red-600">{fout}</p>}
            <button disabled={!wachtwoord} className="w-full rounded-xl bg-[#1E5079] p-3 font-bold text-white disabled:opacity-40">Inloggen</button>
          </form>
        )}
        {status === "in" &&
          TEGELS.map((t) => (
            <a key={t.titel} href={t.href} className="flex items-center gap-5 rounded-2xl border-2 border-slate-200 bg-white p-6 transition hover:border-[#1E5079] active:scale-[0.98]">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#1E5079] text-white">
                <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={t.pad} /></svg>
              </span>
              <span>
                <span className="block text-xl font-bold">{t.titel}</span>
                <span className="text-sm text-slate-500">{t.tekst}</span>
              </span>
            </a>
          ))}
      </main>
    </>
  );
}

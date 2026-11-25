import "./globals.css";
import { overpass } from "./_c/lettertype";

export const metadata = { title: "Pagina niet gevonden | BartMooi", robots: { index: false } };

export default function GlobaalNietGevonden() {
  return (
    <html lang="nl-NL" className={overpass.variable}>
      <body className="bg-licht font-sans text-[18px] leading-[27px] text-tekst antialiased">
        <main className="px-4 py-[100px] text-center">
          <h1 className="text-[38.4px] font-bold leading-[46px] tracking-[-1.8px] text-zwart md:text-[64px] md:leading-[70px]">Deze pagina bestaat niet</h1>
          <p className="mx-auto mt-5 max-w-[480px]">De pagina die u zoekt is verplaatst of bestaat niet meer.</p>
          <a href="/" className="mt-8 inline-flex h-[46px] items-center bg-blauw px-[30px] text-[14px] font-bold uppercase tracking-[1.6px] text-white">Naar de homepage</a>
        </main>
      </body>
    </html>
  );
}

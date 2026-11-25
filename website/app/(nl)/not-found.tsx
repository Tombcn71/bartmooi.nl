import { Knop } from "../_c/ui";

export const metadata = { title: "Pagina niet gevonden | BartMooi", robots: { index: false } };

export default function NietGevonden() {
  return (
    <section className="bg-licht px-4 py-[100px] text-center">
      <h1 className="text-[38.4px] font-bold leading-[46px] tracking-[-1.8px] text-zwart md:text-[64px] md:leading-[70px]">Deze pagina bestaat niet</h1>
      <p className="mx-auto mt-5 max-w-[480px]">De pagina die u zoekt is verplaatst of bestaat niet meer. Ga terug naar de homepage of neem contact met ons op.</p>
      <Knop href="/" className="mt-8">Naar de homepage</Knop>
    </section>
  );
}

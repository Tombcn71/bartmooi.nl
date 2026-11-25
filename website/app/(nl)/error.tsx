"use client";

export default function Fout({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="bg-licht px-4 py-[100px] text-center">
      <h1 className="text-[38.4px] font-bold leading-[46px] tracking-[-1.8px] text-zwart md:text-[64px] md:leading-[70px]">Er ging iets mis</h1>
      <p className="mx-auto mt-5 max-w-[480px]">Probeer het opnieuw. Lukt het niet, bel ons dan op 06 14 11 23 24.</p>
      <button onClick={reset} className="mt-8 inline-flex h-[46px] items-center bg-blauw px-[30px] text-[14px] font-bold uppercase tracking-[1.6px] text-white">Opnieuw proberen</button>
    </main>
  );
}

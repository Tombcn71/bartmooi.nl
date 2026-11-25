import Image from "next/image";
import { Reveal } from "./Onthul";
import { Lnk } from "./ui";
import { t } from "../_i18n";

export type Cel = { foto: string; titel: string; positie?: string };

function Vak({ cel, groot = false, className = "", eerste = false }: { cel: Cel; groot?: boolean; className?: string; eerste?: boolean }) {
  return (
    <Lnk href="/projecten/" aria-label={t(cel.titel)} className={`relative block overflow-hidden ${className}`}>
      <Image src={`/img/${cel.foto}`} alt="" fill sizes="(min-width: 768px) 500px, 92vw" quality={eerste ? 45 : 60} className={`object-cover ${cel.positie ?? ""}`} {...(eerste ? { priority: true, loading: "eager" as const, fetchPriority: "high" as const } : {})} />
      <Reveal as="span" anim="slideInLeft" className={`absolute bottom-0 left-0 bg-white px-6 font-bold text-zwart ${groot ? "py-[18px] text-[27.2px] leading-[33px]" : "py-[14px] text-[20.8px] leading-[25px]"}`}>{t(cel.titel)}</Reveal>
    </Lnk>
  );
}

const m = "h-[200px] md:h-auto";

/** Fotomozaïek van tien vakken: twee blokken onder elkaar, het tweede gespiegeld. */
export function Mozaiek({ cellen }: { cellen: Cel[] }) {
  const [a, b, c, d, e, f, g, h, i, j] = cellen;
  return (
    <div className="grid gap-3">
      <div className="grid gap-3 md:grid-cols-[500px_1fr]">
        <Vak cel={a} groot eerste className="h-[300px] md:h-[496px]" />
        <div className="grid gap-3 md:grid-rows-[251px_233px]">
          <div className="grid gap-3 md:grid-cols-[413px_1fr]"><Vak cel={b} className={m} /><Vak cel={c} className={m} /></div>
          <div className="grid gap-3 md:grid-cols-[271px_1fr]"><Vak cel={d} className={m} /><Vak cel={e} className={m} /></div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_500px]">
        <div className="grid gap-3 md:grid-rows-[251px_233px]">
          <div className="grid gap-3 md:grid-cols-[413px_1fr]"><Vak cel={f} className={m} /><Vak cel={g} className={m} /></div>
          <div className="grid gap-3 md:grid-cols-[271px_1fr]"><Vak cel={i} className={m} /><Vak cel={j} className={m} /></div>
        </div>
        <Vak cel={h} groot className="order-first h-[300px] md:order-none md:h-[496px]" />
      </div>
    </div>
  );
}

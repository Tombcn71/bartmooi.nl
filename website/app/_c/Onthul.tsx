import { createElement, type ReactNode } from "react";

type Soort = "fadeInUp" | "fadeInDown" | "fadeInLeft" | "slideInLeft" | "zoomIn" | "fadeIn";

/** Laat een onderdeel in beeld komen zodra het zichtbaar wordt, zoals op de oude site. Geen JavaScript per onderdeel: één klein script (OnthulScript) doet het voor de hele pagina. */
export function Reveal({ anim, delay = 0, as = "div", className = "", children }: { anim: Soort; delay?: number; as?: string; className?: string; children: ReactNode }) {
  return createElement(as, { className: `reveal ${anim}${delay ? ` dl-${delay}` : ""} ${className}` }, children);
}

/** Zoals Reveal, maar zonder wachten op het scherm: voor wat meteen in beeld staat. */
export function Direct({ anim, vertraging = 0, children }: { anim: Soort; vertraging?: number; children: ReactNode }) {
  return <div className={`direct ${anim}${vertraging ? ` vz-${vertraging}` : ""}`}>{children}</div>;
}

const SCRIPT = "(function(){var e=document.querySelectorAll('.reveal');if(!('IntersectionObserver' in window)){for(var k=0;k<e.length;k++)e[k].classList.add('aan');return}var o=new IntersectionObserver(function(l){for(var i=0;i<l.length;i++){if(l[i].isIntersecting){l[i].target.classList.add('aan');o.unobserve(l[i].target)}}},{rootMargin:'0px 0px -10% 0px',threshold:.05});for(var k=0;k<e.length;k++)o.observe(e[k])})()";

/** Eén keer per pagina, onderaan: laat alle Reveal-onderdelen verschijnen als ze in beeld komen. */
export function OnthulScript() {
  return (
    <>
      <noscript><style>{".reveal{visibility:visible}"}</style></noscript>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}

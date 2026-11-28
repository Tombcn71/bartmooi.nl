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

// Houdt de hele tijd in de gaten (ook na doorklikken, taal wisselen of een update van React) welke .reveal nog niet zichtbaar is.
// Al eens zichtbaar geweest → meteen weer zichtbaar. Nieuw → zichtbaar zodra het in beeld komt. Blijft een paar honderd bytes, geen extra bestand.
const SCRIPT = "(function(){if(window.__onthul)return;window.__onthul=1;var io='IntersectionObserver' in window?new IntersectionObserver(function(l){for(var i=0;i<l.length;i++){if(l[i].isIntersecting){var t=l[i].target;t.__z=1;t.classList.add('aan');io.unobserve(t)}}},{rootMargin:'0px 0px -10% 0px',threshold:.05}):null;function s(){var e=document.querySelectorAll('.reveal:not(.aan)');for(var k=0;k<e.length;k++){var t=e[k];if(t.__z||!io){t.classList.add('aan')}else if(!t.__o){t.__o=1;io.observe(t)}}}s();new MutationObserver(s).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']})})()";

/** Eén keer per pagina, onderaan: laat alle Reveal-onderdelen verschijnen als ze in beeld komen. */
export function OnthulScript() {
  return (
    <>
      <noscript><style>{".reveal{visibility:visible}"}</style></noscript>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}

"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

type Soort = "fadeInUp" | "fadeInDown" | "fadeInLeft" | "slideInLeft" | "zoomIn" | "fadeIn";

/** Laat een onderdeel in beeld komen zodra het zichtbaar wordt, zoals op de oude site. */
export function Reveal({ anim, delay = 0, as = "div", className = "", children }: { anim: Soort; delay?: number; as?: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [aan, setAan] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAan(true); io.disconnect(); } },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(
    as,
    { ref, className: `reveal ${anim} ${aan ? "aan" : ""} ${className}`, style: aan && delay ? { animationDelay: `${delay}ms` } : undefined },
    children,
  );
}

/** Zoals Reveal, maar zonder JavaScript: voor wat meteen in beeld staat, zodat de pagina niet wacht op het script. */
export function Direct({ anim, vertraging = 0, children }: { anim: Soort; vertraging?: number; children: ReactNode }) {
  return <div className={`direct ${anim}`} style={vertraging ? { animationDelay: `${vertraging}ms` } : undefined}>{children}</div>;
}

/** Teller die oploopt tot het eindgetal zodra hij in beeld komt (2 seconden, zoals op de oude site). */
export function Teller({ tot, decimalen = 0 }: { tot: number; decimalen?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const stap = (t: number) => {
        const p = Math.min((t - start) / 2000, 1);
        setN(tot * (0.5 - Math.cos(p * Math.PI) / 2));
        if (p < 1) requestAnimationFrame(stap);
      };
      requestAnimationFrame(stap);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [tot]);
  return <span ref={ref}>{n.toFixed(decimalen)}</span>;
}

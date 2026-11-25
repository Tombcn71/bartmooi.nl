"use client";

import { useEffect, useRef, useState } from "react";


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

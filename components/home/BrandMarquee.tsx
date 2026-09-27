"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoMark from "@/components/ui/LogoMark";
import { brands } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Row({ items, outline }: { items: string[]; outline?: boolean }) {
  const list = [...items, ...items];
  return (
    <div data-row className="flex w-max items-center will-change-transform">
      {list.map((b, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-display px-[2.2vw] text-[11vw] font-black uppercase leading-[1.05] md:text-[7vw] ${
              outline ? "text-outline text-ink/50" : "text-ink"
            }`}
          >
            {b}
          </span>
          <LogoMark className="size-[5vw] shrink-0 md:size-[3.2vw]" />
        </span>
      ))}
    </div>
  );
}

/** Two brand rows that drift in opposite directions and speed up with scroll velocity. */
export default function BrandMarquee() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>("[data-row]");
      const tweens = rows.map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 40, ease: "none", repeat: -1 },
        ),
      );
      // Start deep into the loop so scrolling up (negative timeScale) can run backwards forever
      tweens.forEach((t) => t.totalTime(40 * 500));
      const skew = gsap.quickTo(rows, "skewX", { duration: 0.5, ease: "power3.out" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = 1 + Math.min(Math.abs(v) / 300, 6);
          tweens.forEach((t) => gsap.to(t, { timeScale: boost * (v < 0 ? -1 : 1), duration: 0.2, overwrite: true }));
          skew(gsap.utils.clamp(-8, 8, v / -250));
        },
        onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
      });
      // Ease back to cruising speed when scrolling stops
      const settle = () => {
        tweens.forEach((t) => gsap.to(t, { timeScale: Math.sign(t.timeScale()) || 1, duration: 1.2, overwrite: true }));
        skew(0);
      };
      ScrollTrigger.addEventListener("scrollEnd", settle);
      return () => ScrollTrigger.removeEventListener("scrollEnd", settle);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="brands"
      aria-label="Brands we stock"
      className="relative z-20 overflow-hidden border-y border-line bg-paper py-[6vw] md:py-[4vw]"
    >
      <p className="mx-auto mb-8 max-w-[1600px] px-5 font-mono text-[11px] uppercase tracking-[0.25em] text-ink/50 md:px-10">
        — Brands on our shelves
      </p>
      <div className="flex flex-col gap-2">
        <Row items={brands.slice(0, 6)} />
        <Row items={brands.slice(6)} outline />
      </div>
    </section>
  );
}

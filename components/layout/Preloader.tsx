"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import LogoMark from "@/components/ui/LogoMark";
import { useLenis } from "@/components/providers/SmoothScroll";
import { markIntroDone } from "@/lib/stage";

/** Brand intro: counter + wordmark, then the panel lifts away to reveal the hero. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
  }, [lenis]);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    let seen = false;
    try {
      seen = sessionStorage.getItem("nwmz-intro") === "1";
      sessionStorage.setItem("nwmz-intro", "1");
    } catch {}

    const finish = () => {
      setDone(true);
      document.documentElement.style.overflow = "";
    };
    document.documentElement.style.overflow = "hidden";

    const counter = { v: 0 };
    const tl = gsap.timeline({ onComplete: finish });
    const speed = seen ? 0.35 : 1;
    tl.to(counter, {
      v: 100,
      duration: 1.6 * speed,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
      },
    })
      .from("[data-pl-letter]", { yPercent: 110, duration: 0.9 * speed, stagger: 0.04 * speed, ease: "expo.out" }, 0.1)
      .to("[data-pl-bar]", { scaleX: 1, duration: 1.6 * speed, ease: "power2.inOut" }, 0)
      .from("[data-pl-mark]", { scale: 0, rotate: -120, duration: 1 * speed, ease: "back.out(1.6)" }, 0.2)
      .to("[data-pl-inner]", { yPercent: -30, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.1")
      .add(markIntroDone, "-=0.2")
      .to(root.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "-=0.3")
      .to("[data-pl-curve]", { attr: { d: "M0 0 H100 V0 Q50 0 0 0 Z" }, duration: 1, ease: "expo.inOut" }, "<");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) lenis?.start();
  }, [done, lenis]);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[90] text-white" aria-hidden>
      <div className="absolute inset-0 bg-brand" />
      <svg className="absolute left-0 top-full h-[12vh] w-full text-brand" viewBox="0 0 100 10" preserveAspectRatio="none">
        <path data-pl-curve d="M0 0 H100 V0 Q50 10 0 0 Z" fill="currentColor" />
      </svg>
      <div data-pl-inner className="relative flex h-full flex-col items-center justify-center">
        <div data-pl-mark className="mb-8 size-20 md:size-24">
          <LogoMark tone="light" className="size-full" />
        </div>
        <div className="font-display flex overflow-hidden text-[13vw] font-black leading-[0.85] md:text-[8vw]">
          {"WELCOME".split("").map((c, i) => (
            <span key={i} data-pl-letter className="inline-block">
              {c}
            </span>
          ))}
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.5em] text-white/70">Mobile Zone</p>
        <div className="absolute inset-x-6 bottom-10 flex items-end justify-between md:inset-x-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/70">Dubai Plaza · Bahawalpur</span>
          <span ref={count} className="font-display text-5xl font-black tabular-nums md:text-7xl">
            000
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
          <div data-pl-bar className="h-full origin-left scale-x-0 bg-white" />
        </div>
      </div>
    </div>
  );
}

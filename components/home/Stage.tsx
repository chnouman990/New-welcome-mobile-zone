"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "./Hero";
import Showcase from "./Showcase";
import { onIntroDone, phoneIntro, phoneTarget } from "@/lib/stage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PhoneCanvas = dynamic(() => import("@/components/three/PhoneCanvas"), { ssr: false });

type Key = { x: number; y: number; rx: number; ry: number; rz: number; scale: number; float?: number };

const TAU = Math.PI * 2;

/**
 * Phone keyframes along the stage, measured in "vh of scroll":
 *   0–120   hero is pinned        → phone spins and slides right
 *   120–220 showcase slides in    → phone crosses to the left
 *   220–520 showcase is pinned    → three steps (front, back, 3/4)
 *   520–620 showcase scrolls away → phone leaves with it
 */
const layouts: Record<"desktop" | "mobile", Key[]> = {
  desktop: [
    { x: 0, y: -0.02, rx: 0.08, ry: -0.32, rz: 0.12, scale: 0.9, float: 1 }, // 0
    { x: 0.44, y: 0, rx: 0.05, ry: TAU - 0.5, rz: -0.08, scale: 0.9, float: 1 }, // 120
    { x: -0.42, y: 0, rx: 0.04, ry: TAU + 0.42, rz: -0.06, scale: 1.02, float: 0.8 }, // 220 step 1
    { x: -0.42, y: 0, rx: -0.04, ry: TAU + Math.PI - 0.4, rz: 0.1, scale: 1.05, float: 0.8 }, // 320 step 2
    { x: -0.4, y: 0, rx: -0.12, ry: TAU + Math.PI + 0.55, rz: -0.04, scale: 1.08, float: 0.8 }, // 420 step 3
    { x: -0.4, y: 0, rx: -0.12, ry: TAU + Math.PI + 0.75, rz: -0.04, scale: 1.08, float: 0.8 }, // 520
    { x: -0.4, y: 2.1, rx: 0.2, ry: TAU + Math.PI + 1.1, rz: 0.1, scale: 1, float: 0 }, // 620
  ],
  mobile: [
    { x: 0, y: 0.02, rx: 0.08, ry: -0.32, rz: 0.12, scale: 0.5, float: 1 },
    { x: 0.34, y: -0.52, rx: 0.05, ry: TAU - 0.5, rz: -0.12, scale: 0.46, float: 1 },
    { x: 0, y: 0.36, rx: 0.04, ry: TAU + 0.42, rz: -0.06, scale: 0.52, float: 0.8 },
    { x: 0, y: 0.36, rx: -0.04, ry: TAU + Math.PI - 0.4, rz: 0.1, scale: 0.54, float: 0.8 },
    { x: 0, y: 0.36, rx: -0.12, ry: TAU + Math.PI + 0.55, rz: -0.04, scale: 0.55, float: 0.8 },
    { x: 0, y: 0.36, rx: -0.12, ry: TAU + Math.PI + 0.75, rz: -0.04, scale: 0.55, float: 0.8 },
    { x: 0, y: 2.5, rx: 0.2, ry: TAU + Math.PI + 1.1, rz: 0.1, scale: 0.5, float: 0 },
  ],
};
const stops = [0, 120, 220, 320, 420, 520, 620];

export default function Stage() {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);

  // Entrance once the preloader has finished
  useEffect(() => {
    return onIntroDone(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(phoneIntro, { y: 0, ry: 0, scale: 1, duration: 2.2 }, 0)
        .from("[data-hero-letter-inner]", { yPercent: 110, duration: 1.4, stagger: 0.06 }, 0.1)
        .from("[data-hero-rule]", { scaleX: 0, duration: 1.4 }, 0.5)
        .from("[data-hero-new] span:nth-child(2), [data-hero-sub]", { opacity: 0, y: 20, duration: 1.2, stagger: 0.1 }, 0.6)
        .from("[data-hero-fade]", { opacity: 0, y: 24, duration: 1.2, stagger: 0.08 }, 0.8);
    });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (ctx) => {
        counter.current = root.current!.querySelector("[data-showcase-count]");
        const keys = [...(ctx.conditions!.desktop ? layouts.desktop : layouts.mobile)];
        // Start with the phone standing in for the "O" of WELCOME — just like the logo.
        const o = root.current!.querySelectorAll("[data-hero-letter]")[4]?.getBoundingClientRect();
        const box = root.current!.querySelector("[data-hero] > div")!.getBoundingClientRect();
        if (o) {
          keys[0] = {
            ...keys[0],
            x: ((o.left + o.width / 2) / window.innerWidth) * 2 - 1,
            y: -(((o.top - box.top + o.height / 2) / box.height) * 2 - 1),
          };
        }
        gsap.set(phoneTarget, { ...keys[0], float: keys[0].float ?? 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              const v = self.progress * 620;
              const n = v < 270 ? 1 : v < 370 ? 2 : 3;
              if (counter.current && counter.current.textContent !== `0${n}`) counter.current.textContent = `0${n}`;
            },
          },
        });

        // Only render WebGL while the stage is on screen
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => setVisible(self.isActive),
        });

        // Phone path
        for (let i = 1; i < keys.length; i++) {
          const dur = stops[i] - stops[i - 1];
          tl.to(phoneTarget, { ...keys[i], duration: dur, ease: i === keys.length - 1 ? "none" : "power2.inOut" }, stops[i - 1]);
        }

        // Hero: wordmark breaks apart, copy swaps
        tl.to(
          "[data-hero-letter]",
          { yPercent: (i) => -60 - ((i * 37) % 5) * 22, opacity: 0, duration: 55, stagger: { each: 3, from: "center" }, ease: "power2.in" },
          0,
        )
          .to("[data-hero-new], [data-hero-sub]", { opacity: 0, y: -60, duration: 50 }, 0)
          .to("[data-hero-copy], [data-hero-fade]", { opacity: 0, y: -40, duration: 40 }, 0)
          .to("[data-hero-glow]", { xPercent: ctx.conditions!.desktop ? 60 : 30, scale: 1.3, duration: 120 }, 0)
          .from("[data-hero-two-line]", { yPercent: 110, duration: 40, stagger: 10, ease: "power3.out" }, 62)
          .from("[data-hero-two-p]", { opacity: 0, y: 30, duration: 30, stagger: 10 }, 70);

        // Showcase steps
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]");
        steps.forEach((step, i) => {
          const lines = step.querySelectorAll("[data-step-line]");
          const body = step.querySelectorAll("[data-step-body]");
          const inAt = 180 + i * 100;
          if (i > 0) gsap.set(step, { autoAlpha: 0 });
          tl.fromTo(step, { autoAlpha: i === 0 ? 1 : 0 }, { autoAlpha: 1, duration: 1 }, inAt)
            .from(lines, { yPercent: 110, duration: 30, stagger: 8, ease: "power3.out" }, inAt)
            .from(body, { opacity: 0, y: 30, duration: 25, stagger: 6 }, inAt + 12);
          if (i < steps.length - 1) {
            tl.to(lines, { yPercent: -110, duration: 18, stagger: 4, ease: "power2.in" }, inAt + 78)
              .to(body, { opacity: 0, y: -20, duration: 16 }, inAt + 78)
              .set(step, { autoAlpha: 0 }, inAt + 100);
          }
        });
        tl.to("[data-showcase-progress]", { scaleY: 1, duration: 300, ease: "none" }, 220);
        tl.to("[data-showcase-bg]", { xPercent: -30, duration: 400, ease: "none" }, 120);
        tl.set({}, {}, 620);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      <div className="pointer-events-none fixed inset-0 z-[5]" style={{ visibility: visible ? "visible" : "hidden" }}>
        <PhoneCanvas visible={visible} />
      </div>
      <Hero />
      <Showcase />
    </div>
  );
}

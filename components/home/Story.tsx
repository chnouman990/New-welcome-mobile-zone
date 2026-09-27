"use client";

import { Fragment, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LogoMark from "@/components/ui/LogoMark";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// "*" marks words that are highlighted in brand blue; "@" drops in the logo mark.
const TEXT =
  "Bahawalpur knows where to find us — *Dubai *Plaza. @ Same counter, same faces, same honest advice. Now that counter is open *online: the newest Android phones and every accessory that goes with them, just a *message away.";

export default function Story() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-word]",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: "[data-story-text]", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.fromTo(
        "[data-story-mark]",
        { rotate: -90, scale: 0 },
        {
          rotate: 0,
          scale: 1,
          ease: "back.out(2)",
          scrollTrigger: { trigger: "[data-story-mark]", start: "top 85%", end: "top 55%", scrub: true },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative z-20 bg-ink py-28 text-white md:py-44">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <p className="mb-10 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-300">— Our story, going digital</p>
        <p data-story-text className="font-display max-w-[22ch] text-[8.2vw] font-extrabold leading-[1.05] md:text-[4.6vw]">
          {TEXT.split(" ").map((w, i) => (
            <Fragment key={i}>
              {w === "@" ? (
                <span data-story-mark className="inline-block size-[0.85em] translate-y-[0.12em]">
                  <LogoMark className="size-full" />
                </span>
              ) : (
                <span data-word className={`inline-block ${w.startsWith("*") ? "text-brand-300" : ""}`}>
                  {w.replace("*", "")}
                </span>
              )}{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

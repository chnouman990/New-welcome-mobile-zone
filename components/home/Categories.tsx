"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import CategoryArt from "./CategoryArt";
import { ArrowUpRight } from "@/components/ui/Icons";
import { categories } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Vertical scroll drives a horizontal track of category panels. */
export default function Categories() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const distance = () => track.current!.scrollWidth - window.innerWidth;

      // Height of the section = horizontal distance + one screen, so the sticky panel stays put while we scroll across.
      const size = () => {
        root.current!.style.height = `${distance() + window.innerHeight}px`;
      };
      size();
      ScrollTrigger.addEventListener("refreshInit", size);

      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-cat-card]").forEach((card) => {
        const art = card.querySelector("[data-cat-art]");
        gsap.fromTo(
          art,
          { rotate: -12, scale: 0.85, xPercent: 20 },
          {
            rotate: 6,
            scale: 1,
            xPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });

      gsap.to("[data-cat-bar]", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true },
      });

      return () => ScrollTrigger.removeEventListener("refreshInit", size);
    },
    { scope: root },
  );

  return (
    <section ref={root} id="accessories" className="relative z-20 bg-brand text-white">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="bg-grid-dark absolute inset-0 opacity-60" />
        <div className="relative mx-auto flex w-full max-w-[1600px] items-end justify-between px-5 pt-24 md:px-10 md:pt-28">
          <h2 className="font-display text-[9vw] font-black leading-[0.9] md:text-[4.5vw]">
            Everything
            <br />
            <span className="text-outline">it needs.</span>
          </h2>
          <p className="hidden max-w-xs pb-2 text-white/75 md:block">
            Phones first — then the chargers, earbuds, covers and power that make them yours. Keep scrolling.
          </p>
        </div>

        <div className="relative flex flex-1 items-center">
          <div ref={track} className="flex gap-5 px-5 will-change-transform md:gap-8 md:px-10">
            {categories.map((c, i) => (
              <article
                key={c.id}
                data-cat-card
                className="group relative flex h-[58svh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] bg-white p-6 text-ink md:h-[60vh] md:w-[42vw] md:p-9 lg:w-[34vw]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-[0.2em] text-ink/50">
                    {String(i + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                  </span>
                  <span className="grid size-11 place-items-center rounded-full bg-paper transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <div data-cat-art className="pointer-events-none absolute right-[-6%] top-[12%] w-[62%] text-ink">
                  <CategoryArt art={c.art} className="h-auto w-full drop-shadow-[0_30px_40px_rgba(9,20,35,0.18)]" />
                </div>
                <div className="relative">
                  <h3 className="font-display max-w-[70%] text-[7vw] font-black leading-[0.95] md:text-[2.4vw]">{c.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/65 md:text-[15px]">{c.blurb}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <li key={it} className="rounded-full bg-paper px-3 py-1.5 text-[12px] font-semibold text-ink/80">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
            <div className="flex w-[70vw] shrink-0 flex-col justify-center md:w-[30vw]">
              <p className="font-display text-[8vw] font-black leading-[0.95] md:text-[3.2vw]">
                Can&apos;t find it?
                <br />
                <span className="text-brand-100">Just ask us.</span>
              </p>
              <p className="mt-4 max-w-xs text-white/75">If it plugs into, protects or powers an Android phone, we can get it.</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mb-8 w-full max-w-[1600px] px-5 md:px-10">
          <div className="h-px w-full bg-white/25">
            <div data-cat-bar className="h-full origin-left scale-x-0 bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { brands } from "@/lib/products";
import { phoneColors, phoneFinish } from "@/lib/stage";

const steps = [
  {
    kicker: "Brand new, box-packed",
    title: ["Sealed in", "the box."],
    body: "Every set we sell is brand new — never refurbished, never used. You open the box, you peel the film, it's yours.",
  },
  {
    kicker: "Every brand, one counter",
    title: ["All the names", "you trust."],
    body: "Compare the latest launches side by side and get honest advice on which one actually fits your budget.",
  },
  {
    kicker: "Made to match",
    title: ["Pick a colour.", "We'll kit it out."],
    body: "Add a matching cover, tempered glass and a fast charger in the same order — ready when you are.",
  },
];

/**
 * Dark, sticky showcase. The 3D phone sits on the left (driven from Stage.tsx)
 * while three story steps swap on the right as you scroll.
 */
export default function Showcase() {
  const [active, setActive] = useState(phoneColors[0].value);

  const pick = (value: string) => {
    phoneFinish.color = value;
    setActive(value);
  };

  return (
    <section data-showcase className="relative h-[400vh] bg-ink text-white">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="bg-grid-dark absolute inset-0" />
        <div className="absolute left-1/2 top-[28%] size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-[140px] md:left-[29%] md:top-1/2" />
        <div
          aria-hidden
          data-showcase-bg
          className="font-display text-outline pointer-events-none absolute -bottom-[4vw] left-0 whitespace-nowrap text-[28vw] font-black leading-none text-white/[0.07]"
        >
          ZONE ZONE ZONE
        </div>

        <div className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 md:top-28 md:px-10">
          <span>Why buy from the zone</span>
          <span>
            <span data-showcase-count>01</span> / 03
          </span>
        </div>

        {/* Steps */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[48%] max-w-[1600px] px-5 md:inset-y-0 md:h-auto md:px-10">
          <div className="relative h-full md:ml-[50%]">
            {steps.map((s, i) => (
              <div
                key={i}
                data-step={i}
                className="absolute inset-x-0 top-0 flex h-full flex-col justify-start md:justify-center md:pr-[8%]"
              >
                <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-brand-300">
                  <span className="inline-block h-px w-8 bg-brand-300" />
                  0{i + 1} — {s.kicker}
                </p>
                <h2 className="font-display text-[10vw] font-black leading-[0.92] md:text-[4.8vw]">
                  {s.title.map((l, j) => (
                    <span key={j} className="line-mask">
                      <span data-step-line>{l}</span>
                    </span>
                  ))}
                </h2>
                <p data-step-body className="mt-5 max-w-md text-[15px] leading-relaxed text-white/65 md:mt-7 md:text-lg">
                  {s.body}
                </p>

                {i === 1 && (
                  <ul data-step-body className="mt-6 flex max-w-lg flex-wrap gap-2">
                    {brands.slice(0, 9).map((b) => (
                      <li key={b} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[13px] font-semibold text-white/85">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {i === 2 && (
                  <div data-step-body className="mt-7">
                    <div className="flex items-center gap-3">
                      {phoneColors.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => pick(c.value)}
                          aria-label={c.name}
                          aria-pressed={active === c.value}
                          className={`relative size-10 rounded-full border-2 transition-transform duration-300 hover:scale-110 ${
                            active === c.value ? "border-white" : "border-white/20"
                          }`}
                          style={{ background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,.5), transparent 55%), ${c.value}` }}
                        />
                      ))}
                    </div>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Finish · {phoneColors.find((c) => c.value === active)?.name}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute right-5 top-1/2 z-10 hidden h-40 w-px -translate-y-1/2 bg-white/15 md:right-10 md:block">
          <div data-showcase-progress className="h-full w-full origin-top scale-y-0 bg-brand-300" />
        </div>
      </div>
    </section>
  );
}

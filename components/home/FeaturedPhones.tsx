"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import Button from "@/components/ui/Button";
import { featuredPhones, formatPKR, type FeaturedPhone } from "@/lib/products";
import { whatsappLink } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Card({ p, index }: { p: FeaturedPhone; index: number }) {
  const tilt = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !tilt.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(tilt.current, { rotateY: x * 22, rotateX: -y * 16, y: -8, duration: 0.6, ease: "power3.out" });
  };
  const onLeave = () => {
    if (tilt.current) gsap.to(tilt.current, { rotateY: 0, rotateX: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <article
      data-phone-card
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-line bg-white ${
        index % 3 === 1 ? "lg:translate-y-16" : ""
      }`}
    >
      <div className="relative grid h-[340px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_60%,#e6ebff,#f3f4f7_70%)] [perspective:900px]">
        <span className="font-display pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[120px] font-black leading-none text-ink/[0.04]">
          {p.brand.toUpperCase()}
        </span>
        {p.tag && (
          <span className="absolute left-5 top-5 rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white">
            {p.tag}
          </span>
        )}
        <div ref={tilt} className="w-[112px] [transform-style:preserve-3d] md:w-[124px]">
          <PhoneMockup finish={p.finish} className="transition-[filter] duration-500 group-hover:brightness-105" />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">{p.brand}</p>
            <h3 className="font-display mt-1 text-2xl font-extrabold leading-tight">{p.name}</h3>
          </div>
          <p className="shrink-0 pt-5 text-lg font-extrabold tabular-nums">{formatPKR(p.price)}</p>
        </div>
        <ul className="flex flex-wrap gap-1.5">
          {p.specs.map((s) => (
            <li key={s} className="rounded-full bg-paper px-2.5 py-1 text-[12px] font-semibold text-ink/70">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-2">
          <a
            href={whatsappLink(`Assalam o Alaikum! Is the ${p.brand} ${p.name} (${p.specs[0]}) available?`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand"
          >
            <WhatsApp className="size-4" /> Order now
          </a>
          <a
            href="#"
            aria-label={`View ${p.name}`}
            className="grid size-11 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-ink"
          >
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedPhones() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-fp-line]", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.set("[data-phone-card]", { opacity: 0 });
      ScrollTrigger.batch("[data-phone-card]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 80, rotate: 2 },
            { opacity: 1, y: 0, rotate: 0, duration: 1.2, ease: "expo.out", stagger: 0.1 },
          ),
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="phones" className="relative z-20 bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-brand">— In the zone right now</p>
            <h2 className="font-display text-[12vw] font-black leading-[0.9] md:text-[6vw]">
              <span className="line-mask">
                <span data-fp-line>Fresh</span>
              </span>
              <span className="line-mask">
                <span data-fp-line className="text-brand">
                  out the box.
                </span>
              </span>
            </h2>
          </div>
          <div className="flex max-w-sm flex-col items-start gap-6">
            <p className="text-ink/70">
              A few of the phones people are asking about this week. Prices change fast — message us for today&apos;s
              best price.
            </p>
            <Button href="#" variant="outline" icon={<ArrowRight className="size-4" />}>
              See all phones
            </Button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 lg:pb-16">
          {featuredPhones.map((p, i) => (
            <Card key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

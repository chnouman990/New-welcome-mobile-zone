"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "@/components/ui/Button";
import { ArrowUpRight, Clock, Phone, Pin, WhatsApp } from "@/components/ui/Icons";
import { mapEmbedUrl, mapLink, site, whatsappLink } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function VisitStore() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-map]",
        { clipPath: "inset(18% 12% 18% 12% round 32px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 32px)",
          ease: "none",
          scrollTrigger: { trigger: "[data-map]", start: "top 90%", end: "top 30%", scrub: true },
        },
      );
      gsap.from("[data-visit-line]", {
        yPercent: 110,
        stagger: 0.08,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="visit" className="relative z-20 bg-paper pb-24 md:pb-32">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="flex flex-col justify-between gap-10 pt-4">
          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-brand">— Visit the store</p>
            <h2 className="font-display text-[12vw] font-black leading-[0.9] md:text-[5.2vw]">
              <span className="line-mask">
                <span data-visit-line>Come say</span>
              </span>
              <span className="line-mask">
                <span data-visit-line className="text-brand">
                  welcome.
                </span>
              </span>
            </h2>
            <p className="mt-6 max-w-md text-ink/70">
              Hold the phone before you buy it. Our counter is in {site.address.line1}, {site.address.city} — drop in,
              try the latest sets and walk out with everything set up.
            </p>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {[
              { icon: <Pin className="size-5" />, k: "Address", v: `${site.address.line1}, ${site.address.city}, ${site.address.region}` },
              { icon: <Clock className="size-5" />, k: "Hours", v: site.hours },
              { icon: <Phone className="size-5" />, k: "Call", v: site.phoneDisplay },
            ].map((row) => (
              <div key={row.k} className="flex items-center gap-4 bg-white p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-100 text-brand">{row.icon}</span>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">{row.k}</dt>
                  <dd className="font-semibold">{row.v}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="flex flex-wrap gap-3">
            <Button href={mapLink} external icon={<ArrowUpRight className="size-4" />}>
              Get directions
            </Button>
            <Button href={whatsappLink()} external variant="outline" spinIcon={false} icon={<WhatsApp className="size-4" />}>
              Message us
            </Button>
          </div>
        </div>

        <div data-map className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-ink lg:min-h-[640px]">
          <iframe
            title={`Map to ${site.name}`}
            src={mapEmbedUrl}
            className="absolute inset-0 h-full w-full [filter:grayscale(1)_contrast(1.1)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 bg-brand mix-blend-color" />
          <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-3 rounded-full bg-white/90 py-2 pl-2 pr-4 shadow-lg backdrop-blur">
            <span className="relative grid size-8 place-items-center rounded-full bg-brand text-white">
              <span className="absolute inset-0 animate-[pulse-ring_1.8s_ease-out_infinite] rounded-full bg-brand" />
              <Pin className="relative size-4" />
            </span>
            <span className="text-sm font-bold">{site.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

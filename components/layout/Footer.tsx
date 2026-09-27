"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const columns = [
  { title: "Shop", links: [{ label: "Phones", href: "#phones" }, { label: "Accessories", href: "#accessories" }, { label: "Brands", href: "#brands" }] },
  { title: "Store", links: [{ label: "Visit us", href: "#visit" }, { label: "WhatsApp", href: whatsappLink() }, { label: "Call", href: `tel:+${site.whatsapp}` }] },
  { title: "Follow", links: site.socials.map((s) => ({ label: s.label, href: s.href })) },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-foot-letter]", {
        yPercent: 100,
        ease: "expo.out",
        duration: 1.4,
        stagger: 0.05,
        scrollTrigger: { trigger: "[data-foot-word]", start: "top 95%" },
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="relative z-20 overflow-hidden bg-brand text-white">
      <div className="bg-grid-dark absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-[1600px] px-5 pt-24 md:px-10 md:pt-32">
        <div className="flex flex-col gap-10 border-b border-white/20 pb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[11vw] font-black leading-[0.92] md:text-[5vw]">
            Your next phone is
            <br />
            <span className="text-outline">one message</span> away.
          </h2>
          <Button href={whatsappLink()} external variant="light" spinIcon={false} icon={<WhatsApp className="size-4" />}>
            Chat on WhatsApp
          </Button>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-extrabold">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              New Android phones & accessories.
              <br />
              {site.address.line1}, {site.address.city}.
            </p>
          </div>
          {columns.map((c) => (
            <div key={c.title}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">{c.title}</p>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group relative inline-block font-semibold">
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div data-foot-word aria-hidden className="relative flex justify-center overflow-hidden">
        <div className="font-display flex translate-y-[14%] text-[13.9vw] font-black leading-[0.8] text-white">
          {"WELCOME".split("").map((c, i) => (
            <span key={i} data-foot-letter className="inline-block">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex max-w-[1600px] flex-col justify-between gap-2 px-5 py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-white/60 sm:flex-row md:px-10">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Made in Bahawalpur</span>
      </div>
    </footer>
  );
}

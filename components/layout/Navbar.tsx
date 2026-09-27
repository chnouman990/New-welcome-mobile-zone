"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Bag, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";

const links = [
  { label: "Phones", href: "#phones" },
  { label: "Accessories", href: "#accessories" },
  { label: "Brands", href: "#brands" },
  { label: "Visit", href: "#visit" },
];

export default function Navbar() {
  const bar = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  // Hide when scrolling down, reveal when scrolling up
  useEffect(() => {
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > last && y > 200;
      if (down !== hidden) {
        hidden = down;
        gsap.to(bar.current, { yPercent: down ? -140 : 0, duration: 0.6, ease: "expo.out" });
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    if (open) {
      lenis?.stop();
      gsap.set(el, { display: "flex" });
      gsap.fromTo(el, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("[data-menu-item]"), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", delay: 0.3 });
    } else {
      lenis?.start();
      gsap.to(el, { clipPath: "circle(0% at 100% 0%)", duration: 0.6, ease: "expo.inOut", onComplete: () => void gsap.set(el, { display: "none" }) });
    }
  }, [open, lenis]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Wait for the menu to close (and smooth scroll to resume) before jumping.
    setTimeout(() => {
      if (lenis) lenis.scrollTo(href, { offset: -80 });
      else document.querySelector(href)?.scrollIntoView();
    }, 450);
  };

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-white/60 bg-white/70 py-2 pl-4 pr-2 shadow-[0_10px_40px_-20px_rgba(9,20,35,0.35)] backdrop-blur-xl md:pl-6">
          <a href="#top" aria-label={`${site.name} — home`} className="shrink-0">
            <Image src="/brand/logo.png" alt={site.name} width={1231} height={393} priority className="h-9 w-auto md:h-10" />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group block rounded-full px-4 py-2 text-[14px] font-semibold text-ink/80 hover:text-ink"
                >
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{l.label}</span>
                    <span aria-hidden className="absolute inset-0 block translate-y-full text-brand transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
                      {l.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="hidden h-11 items-center gap-2 rounded-full bg-brand px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand-600 sm:inline-flex"
            >
              <WhatsApp className="size-4" /> Order now
            </a>
            <button
              type="button"
              aria-label="Cart (coming soon)"
              className="relative grid size-11 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-brand"
            >
              <Bag className="size-5" />
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold ring-2 ring-white">
                0
              </span>
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="relative z-[60] grid size-11 place-items-center rounded-full border border-line md:hidden"
            >
              <span className={`absolute h-0.5 w-5 bg-ink transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-0.5 w-5 bg-ink transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </nav>
      </header>

      <div ref={menu} className="fixed inset-0 z-40 hidden flex-col justify-between bg-brand px-6 pb-10 pt-32 text-white md:hidden">
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.href} className="overflow-hidden">
              <a data-menu-item href={l.href} onClick={(e) => go(e, l.href)} className="font-display block text-[11vw] font-black leading-[1.05]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="overflow-hidden">
          <a data-menu-item href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-lg font-semibold">
            <WhatsApp className="size-5" /> Order on WhatsApp
          </a>
          <p data-menu-item className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            {site.address.line1} · {site.address.city}
          </p>
        </div>
      </div>
    </>
  );
}

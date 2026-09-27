"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// TODO: confirm each promise matches how the shop actually works before launch.
const promises = [
  {
    title: "Brand-new sets only",
    body: "Sealed, box-packed phones. No refurbished or used stock — ever.",
    icon: (
      <path d="M4 8l8-4 8 4v8l-8 4-8-4V8Zm0 0 8 4 8-4M12 12v8" />
    ),
  },
  {
    title: "Honest advice",
    body: "Tell us your budget and what you use your phone for. We'll tell you straight.",
    icon: <path d="M4 5h16v11H9l-5 4V5Zm4 5h8M8 13h5" />,
  },
  {
    title: "Order on WhatsApp",
    body: "Send a message, confirm your set and colour, and we'll get it ready.",
    icon: <path d="M5 19l1.5-4A8 8 0 1 1 9 18.5L5 19Zm5-10c0 3 2 5 5 5" />,
  },
  {
    title: "Pick up or delivery",
    body: "Collect from Dubai Plaza, or have it delivered to your door.",
    icon: <path d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  },
];

export default function Promises() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-promise]", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative z-20 bg-paper py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
          <h2 className="font-display text-[10vw] font-black leading-[0.92] md:text-[4.5vw]">
            The zone
            <br />
            <span className="text-brand">promise.</span>
          </h2>
          <p className="hidden max-w-xs text-ink/65 md:block">Shopping online should feel exactly like shopping at our counter.</p>
        </div>
        <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => (
            <div
              key={p.title}
              data-promise
              className="group relative overflow-hidden border-b border-line p-6 transition-colors duration-500 sm:border-r md:p-8 lg:[&:nth-child(4)]:border-r-0"
            >
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-brand transition-transform duration-500 ease-out-expo group-hover:scale-y-100" />
              <div className="relative transition-colors duration-500 group-hover:text-white">
                <div className="mb-16 flex items-center justify-between md:mb-24">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-9 text-brand transition-colors duration-500 group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    {p.icon}
                  </svg>
                  <span className="font-mono text-xs text-ink/40 transition-colors duration-500 group-hover:text-white/60">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-extrabold">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-white/80">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** A soft cursor follower that swells over links and buttons (mouse devices only). */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = dot.current!;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let hovering = false;

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
      const interactive = !!(e.target as HTMLElement).closest("a, button");
      if (interactive !== hovering) {
        hovering = interactive;
        gsap.to(el, { scale: interactive ? 3.2 : 1, duration: 0.4, ease: "power3.out" });
      }
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[80] size-3 rounded-full bg-brand mix-blend-multiply"
      style={{ opacity: 0 }}
    />
  );
}

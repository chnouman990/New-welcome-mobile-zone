import Button from "@/components/ui/Button";
import { ArrowRight, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";

const WORD = "WELCOME".split("");

/**
 * Hero: a tall scroll container with a sticky viewport. The 3D phone floats
 * over the giant wordmark; scroll-driven animations live in Stage.tsx.
 */
export default function Hero() {
  return (
    <section id="top" data-hero className="relative h-[220vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-paper">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div
          data-hero-glow
          className="absolute left-1/2 top-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[120px]"
        />

        {/* Top meta row */}
        <div className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60 md:top-28 md:px-10">
          <span data-hero-fade className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-[pulse-ring_1.8s_ease-out_infinite] rounded-full bg-brand" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            {site.address.line1} · {site.address.city}
          </span>
          <span data-hero-fade className="hidden sm:inline">Android only · Brand new · Accessories</span>
        </div>

        {/* Giant wordmark */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
          <div data-hero-new className="mb-[2vw] flex w-[70vw] items-center gap-[2vw] md:w-[46vw]">
            <span data-hero-rule className="h-[3px] flex-1 origin-right rounded-full bg-brand" />
            <span className="font-display text-[5.5vw] font-black leading-none text-ink md:text-[3.6vw]">NEW</span>
            <span data-hero-rule className="h-[3px] flex-1 origin-left rounded-full bg-brand" />
          </div>
          <h1 className="sr-only">
            {site.name} — new Android phones and accessories in {site.address.city}
          </h1>
          <div aria-hidden className="font-display flex text-[13.9vw] font-black leading-[0.8] text-brand">
            {WORD.map((ch, i) => (
              <span key={i} data-hero-letter className="line-mask">
                <span data-hero-letter-inner>{ch}</span>
              </span>
            ))}
          </div>
          <div
            data-hero-sub
            className="font-display mt-[2vw] text-[4.2vw] font-extrabold tracking-[0.45em] text-ink md:text-[2.3vw]"
          >
            MOBILE&nbsp;ZONE
          </div>
        </div>

        {/* State 1: intro copy + CTAs */}
        <div
          data-hero-copy
          className="absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-[1600px] flex-col gap-6 px-5 md:bottom-12 md:flex-row md:items-end md:justify-between md:px-10"
        >
          <p data-hero-fade className="max-w-md text-[15px] leading-relaxed text-ink/75 md:text-lg">
            The newest <strong className="font-bold text-ink">Android phones</strong> and the accessories that go with
            them — from our counter in {site.address.line1} to your hands.
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <Button href="#phones" icon={<ArrowRight className="size-4" />}>
              Explore phones
            </Button>
            <Button href={whatsappLink()} external variant="outline" spinIcon={false} icon={<WhatsApp className="size-4" />}>
              Order on WhatsApp
            </Button>
          </div>
        </div>

        {/* Scroll cue */}
        <div data-hero-fade className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-ink/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.6s_ease-in-out_infinite] bg-brand" />
          </span>
        </div>

        {/* State 2: revealed on scroll */}
        <div
          data-hero-two
          className="pointer-events-none absolute inset-x-0 top-[18%] z-10 mx-auto max-w-[1600px] px-5 md:top-1/2 md:-translate-y-1/2 md:px-10"
        >
          <p data-hero-two-p className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-brand">— The zone</p>
          <h2 className="font-display text-[11vw] font-black leading-[0.92] text-ink md:text-[6.2vw]">
            {["Only Android.", "Only new.", "All yours."].map((l, i) => (
              <span key={i} className="line-mask">
                <span data-hero-two-line className={i === 2 ? "text-brand" : undefined}>
                  {l}
                </span>
              </span>
            ))}
          </h2>
          <p data-hero-two-p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink/70 md:text-base">
            No iPhones, no second-hand sets. Just brand-new Android phones, sealed in the box, with every accessory you
            need to go with them.
          </p>
        </div>
      </div>
    </section>
  );
}

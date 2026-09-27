# New Welcome Mobile Zone — Website

Website for **New Welcome Mobile Zone**, Dubai Plaza, Bahawalpur — new Android phones & accessories.

## Tech

- **Next.js 16** (App Router) + **TypeScript** — ready for more pages, an admin panel and API routes later
- **Tailwind CSS v4** — brand colours live in `app/globals.css` (`--color-brand: #0d3fd6`, `--color-ink: #091423`)
- **GSAP + ScrollTrigger** — all scroll animations
- **Lenis** — smooth scrolling
- **Three.js / React Three Fiber** — the 3D phone, built in code (no model files needed)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Where things live

| What | File |
| --- | --- |
| Shop details (WhatsApp number, phone, hours, socials) | `lib/site.ts` |
| Featured phones, brands, accessory categories | `lib/products.ts` |
| 3D phone model and its lock screen | `components/three/Phone.tsx`, `components/three/screenTexture.ts` |
| How the phone moves while scrolling | `components/home/Stage.tsx` (`layouts` keyframes) |
| Home page sections | `components/home/*` |
| Navbar, footer, preloader | `components/layout/*` |

## Before going live

- [ ] Put the real WhatsApp number, phone number, opening hours and social links in `lib/site.ts`
- [ ] Replace the sample phones and prices in `lib/products.ts` with real stock
- [ ] Confirm the promises on the page match how the shop works (brand-new only, delivery, etc.)

## Next steps

- Product listing + product detail pages
- Cart & checkout (cash on delivery / bank transfer)
- Admin dashboard to manage stock and see / dispatch orders

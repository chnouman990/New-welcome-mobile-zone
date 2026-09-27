import type { Category } from "@/lib/products";

/** Hand-drawn style product illustrations (pure SVG, no photos needed). */
export default function CategoryArt({ art, className }: { art: Category["art"]; className?: string }) {
  const stroke = { stroke: "currentColor", strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (art) {
    case "phone":
      return (
        <svg viewBox="0 0 240 240" className={className} aria-hidden>
          <g transform="rotate(-12 120 120)">
            <rect x="72" y="22" width="96" height="196" rx="20" fill="#0d3fd6" />
            <rect x="80" y="30" width="80" height="180" rx="14" fill="#0a2fa6" />
            <circle cx="120" cy="42" r="4" fill="#050d2e" />
            <path d="M80 150c25-20 55 10 80-12v58a14 14 0 0 1-14 14H94a14 14 0 0 1-14-14Z" fill="#6f8dff" opacity=".6" />
            <text x="120" y="110" textAnchor="middle" fill="#fff" fontSize="30" fontWeight="800" fontFamily="var(--font-archivo)">12:30</text>
          </g>
          <g transform="rotate(10 170 150)">
            <rect x="140" y="70" width="80" height="160" rx="18" fill="#091423" />
            <rect x="152" y="82" width="30" height="58" rx="14" fill="#1a2740" />
            <circle cx="167" cy="96" r="9" fill="#050608" stroke="#c7cfdf" strokeWidth="3" />
            <circle cx="167" cy="124" r="9" fill="#050608" stroke="#c7cfdf" strokeWidth="3" />
          </g>
        </svg>
      );
    case "charger":
      return (
        <svg viewBox="0 0 240 240" className={className} aria-hidden>
          <rect x="54" y="60" width="92" height="104" rx="22" fill="#fff" stroke="#091423" strokeWidth="3" />
          <rect x="80" y="36" width="10" height="26" rx="3" fill="#c7cfdf" stroke="#091423" strokeWidth="3" />
          <rect x="110" y="36" width="10" height="26" rx="3" fill="#c7cfdf" stroke="#091423" strokeWidth="3" />
          <path d="M105 92l-14 22h18l-12 22" {...stroke} stroke="#0d3fd6" strokeWidth="6" />
          <rect x="88" y="164" width="24" height="12" rx="3" fill="#091423" />
          <path d="M100 176c0 30 10 44 40 44s46-20 46-50-8-60 30-70" {...stroke} stroke="#0d3fd6" strokeWidth="8" />
          <rect x="206" y="88" width="20" height="30" rx="5" fill="#091423" transform="rotate(-30 216 103)" />
        </svg>
      );
    case "audio":
      return (
        <svg viewBox="0 0 240 240" className={className} aria-hidden>
          <rect x="44" y="110" width="120" height="96" rx="44" fill="#fff" stroke="#091423" strokeWidth="3" />
          <path d="M44 150h120" stroke="#091423" strokeWidth="3" />
          <circle cx="104" cy="178" r="4" fill="#0d3fd6" />
          <g transform="rotate(-20 150 80)">
            <ellipse cx="150" cy="70" rx="26" ry="30" fill="#0d3fd6" />
            <rect x="140" y="88" width="18" height="56" rx="9" fill="#0d3fd6" />
            <ellipse cx="150" cy="66" rx="12" ry="14" fill="#6f8dff" />
          </g>
          <g transform="rotate(18 200 110)">
            <ellipse cx="200" cy="100" rx="22" ry="26" fill="#091423" />
            <rect x="192" y="116" width="15" height="48" rx="7.5" fill="#091423" />
            <ellipse cx="200" cy="96" rx="10" ry="12" fill="#1a2740" />
          </g>
        </svg>
      );
    case "powerbank":
      return (
        <svg viewBox="0 0 240 240" className={className} aria-hidden>
          <g transform="rotate(-8 120 120)">
            <rect x="56" y="34" width="116" height="176" rx="26" fill="#091423" />
            <rect x="70" y="50" width="88" height="144" rx="18" fill="#101c30" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x="92" y={150 - i * 26} width="44" height="18" rx="5" fill={i < 3 ? "#0d3fd6" : "#1a2740"} />
            ))}
            <path d="M118 62l-10 16h14l-9 16" {...stroke} stroke="#6f8dff" strokeWidth="4" />
            <rect x="104" y="210" width="22" height="8" rx="3" fill="#c7cfdf" />
          </g>
        </svg>
      );
    case "case":
      return (
        <svg viewBox="0 0 240 240" className={className} aria-hidden>
          <g transform="rotate(8 120 120)">
            <rect x="60" y="20" width="112" height="206" rx="26" fill="#6f8dff" opacity=".35" />
            <rect x="66" y="26" width="100" height="194" rx="22" fill="none" stroke="#0d3fd6" strokeWidth="6" />
            <rect x="80" y="40" width="42" height="72" rx="18" fill="none" stroke="#0d3fd6" strokeWidth="5" />
          </g>
          <g transform="rotate(-10 110 130)">
            <rect x="34" y="44" width="100" height="194" rx="22" fill="#fff" opacity=".85" stroke="#091423" strokeWidth="3" />
            <path d="M52 70l40-20M52 100l70-36" stroke="#091423" strokeOpacity=".25" strokeWidth="4" strokeLinecap="round" />
          </g>
        </svg>
      );
    case "watch":
      return (
        <svg viewBox="0 0 240 240" className={className} aria-hidden>
          <rect x="86" y="10" width="68" height="70" rx="16" fill="#091423" />
          <rect x="86" y="160" width="68" height="70" rx="16" fill="#091423" />
          <rect x="62" y="60" width="116" height="120" rx="34" fill="#1a2740" stroke="#c7cfdf" strokeWidth="4" />
          <rect x="74" y="72" width="92" height="96" rx="24" fill="#050d2e" />
          <circle cx="120" cy="120" r="30" fill="none" stroke="#0d3fd6" strokeWidth="8" strokeDasharray="140 200" strokeLinecap="round" transform="rotate(-90 120 120)" />
          <circle cx="120" cy="120" r="18" fill="none" stroke="#6f8dff" strokeWidth="6" strokeDasharray="70 200" strokeLinecap="round" transform="rotate(-90 120 120)" />
          <rect x="176" y="100" width="10" height="26" rx="4" fill="#c7cfdf" />
        </svg>
      );
  }
}

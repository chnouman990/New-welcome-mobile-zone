type Props = { className?: string; tone?: "brand" | "light" };

/** The "O with a phone" mark from the logo, redrawn as a crisp SVG. */
export default function LogoMark({ className, tone = "brand" }: Props) {
  const fill = tone === "brand" ? "#0d3fd6" : "#ffffff";
  const stroke = tone === "brand" ? "#ffffff" : "#0d3fd6";
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="48" fill={fill} />
      <g transform="rotate(18 50 50)">
        <rect x="31" y="20" width="38" height="60" rx="9" fill="none" stroke={stroke} strokeWidth="6" />
        <rect x="41" y="69" width="18" height="4" rx="2" fill={stroke} />
      </g>
    </svg>
  );
}

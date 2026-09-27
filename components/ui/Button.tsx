import Magnetic from "./Magnetic";

type Variant = "primary" | "light" | "outline" | "outline-light";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-600 shadow-[0_10px_30px_-10px_rgba(13,63,214,0.7)]",
  light: "bg-white text-ink hover:bg-brand-100",
  outline: "border border-ink/20 text-ink hover:border-ink bg-white/40 backdrop-blur",
  "outline-light": "border border-white/25 text-white hover:border-white bg-white/5 backdrop-blur",
};

/** Pill button whose label rolls up on hover. */
export default function Button({
  href,
  children,
  icon,
  variant = "primary",
  external,
  className = "",
  onClick,
  spinIcon = true,
}: {
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  spinIcon?: boolean;
}) {
  const cls = `group relative inline-flex h-13 items-center gap-3 rounded-full pl-6 pr-2 text-[15px] font-semibold transition-colors duration-300 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span
        className={`grid size-9 place-items-center rounded-full transition-transform duration-500 ease-out-expo ${spinIcon ? "group-hover:rotate-[-45deg]" : "group-hover:scale-110"} ${
          variant === "primary" ? "bg-white text-brand" : variant === "light" ? "bg-brand text-white" : "bg-current/10"
        }`}
      >
        {icon}
      </span>
    </>
  );

  return (
    <Magnetic strength={0.25}>
      {href ? (
        <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
          {inner}
        </a>
      ) : (
        <button type="button" className={cls} onClick={onClick}>
          {inner}
        </button>
      )}
    </Magnetic>
  );
}

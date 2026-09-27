/** A CSS-drawn phone (back view) in any finish — used where a 3D model would be overkill. */
export default function PhoneMockup({ finish, className = "" }: { finish: [string, string, string]; className?: string }) {
  const [back, island, accent] = finish;
  return (
    <div
      className={`relative aspect-[77/164] rounded-[14%/6.6%] p-[2.2%] ${className}`}
      style={{
        background: `linear-gradient(135deg, #e9edf5, #9aa3b5 40%, #f4f6fa 60%, #7d869a)`,
        boxShadow: "0 40px 60px -30px rgba(9,20,35,.55), 0 10px 20px -10px rgba(9,20,35,.3)",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[12.5%/5.9%]"
        style={{
          background: `radial-gradient(120% 80% at 80% 10%, ${accent}55, transparent 60%), linear-gradient(160deg, ${back}, ${back} 45%, color-mix(in oklab, ${back} 70%, black))`,
        }}
      >
        {/* glass sheen */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,.28)_42%,transparent_52%)]" />
        {/* camera island */}
        <div
          className="absolute left-[9%] top-[5%] flex h-[33%] w-[36%] flex-col items-center justify-around rounded-[40%/20%] py-[4%]"
          style={{
            background: `linear-gradient(160deg, color-mix(in oklab, ${island} 80%, white), ${island})`,
            boxShadow: "inset 0 1px 2px rgba(255,255,255,.25), 0 6px 14px rgba(0,0,0,.35)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block aspect-square w-[62%] rounded-full"
              style={{
                background: "radial-gradient(circle at 50% 50%, #2a3fa8 0 14%, #05060a 16% 58%, #1a1d26 60% 66%, #d9dfea 68% 78%, #7d869a 80%)",
              }}
            />
          ))}
        </div>
        <span className="absolute left-[52%] top-[8%] block aspect-square w-[7%] rounded-full bg-[#fff4d6] shadow-[0_0_8px_#fff4d6]" />
        <span
          className="font-display absolute bottom-[8%] left-0 right-0 text-center text-[clamp(8px,1vw,12px)] font-extrabold tracking-[0.25em]"
          style={{ color: accent, opacity: 0.7 }}
        >
          WELCOME
        </span>
      </div>
    </div>
  );
}

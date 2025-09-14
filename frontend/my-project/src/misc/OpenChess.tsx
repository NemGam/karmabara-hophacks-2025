import { useMemo } from "react";

type OpenChestProps = {
  top: number;
  left: number;
  size?: number;
  className?: string;
  onClick?: () => void; // optional, does not affect animation
};

export default function OpenChest({
  top,
  left,
  size = 50,
  className = "",
  onClick,
}: OpenChestProps) {
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const dx = (Math.random() * 120 - 60).toFixed(0);   // -60..60px
      const dy = (-60 - Math.random() * 100).toFixed(0);  // fly up
      const dur = (1 + Math.random() * 1.2).toFixed(2);   // 1..2.2s
      const negDelay = (Math.random() * Number(dur)).toFixed(2); // random phase
      const sizePx = (4 + Math.random() * 6).toFixed(0);  // 4..10px
      return (
        <span
          key={i}
          className="gold-particle"
          style={
            {
              // @ts-ignore CSS vars
              "--dx": `${dx}px`,
              "--dy": `${dy}px`,
              "--s": `${sizePx}px`,
              animationDuration: `${dur}s`,
              animationDelay: `-${negDelay}s`,
              animationIterationCount: "infinite",
            } as React.CSSProperties
          }
        />
      );
    });
  }, []);

  return (
    <div
      className={className}
      style={{ position: "absolute", top, left, cursor: "pointer" }}
      onClick={onClick}
    >
      {/* continuous particles */}
      <div className="pointer-events-none absolute inset-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {particles}
      </div>

      {/* chest */}
      <img
        src="/open_chest.png"
        alt="Treasure Chest"
        width={size}
        height={size}
        style={{ transform: "translate(-50%, -50%)" }}
      />

      <style>{`
        .gold-particle{
          position:absolute;
          top:50%; left:50%;
          width: var(--s); height: var(--s);
          border-radius: 2px;
          background:
            radial-gradient(circle at 30% 30%, #fff8b0 0%, #ffe066 35%, #ffb703 65%, #b47500 100%);
          box-shadow:
            0 0 6px rgba(255, 215, 0, 0.6),
            0 0 12px rgba(255, 180, 0, 0.4);
          transform: translate(-50%,-50%);
          opacity: 0;
          animation-name: gold-pop;
          animation-timing-function: ease-out;
        }
        @keyframes gold-pop {
          0%   { opacity: 0; transform: translate(-50%,-50%) scale(0.6); }
          10%  { opacity: 1; }
          100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0.2); }
        }
      `}</style>
    </div>
  );
}

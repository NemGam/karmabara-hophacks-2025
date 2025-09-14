// src/components/CountdownToNextMonday.tsx
import { useEffect, useMemo, useState } from "react";

function getNextMonday(): Date {
  const now = new Date();
  const day = now.getDay(); // 0=Sun..6=Sat
  let add = (8 - day) % 7;
  if (add === 0) add = 7; // always next Monday, not today
  const t = new Date(now);
  t.setDate(now.getDate() + add);
  t.setHours(0, 0, 0, 0); // 00:00 local time
  return t;
}

export default function CountdownToNextMonday({
  className = "",
  onExpire,
}: {
  className?: string;
  onExpire?: () => void;
}) {
  const target = useMemo(() => getNextMonday(), []);
  const [ms, setMs] = useState(() => Math.max(0, target.getTime() - Date.now()));

  useEffect(() => {
    const id = setInterval(() => {
      const left = Math.max(0, target.getTime() - Date.now());
      setMs(left);
      if (left === 0) {
        clearInterval(id);
        onExpire?.();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target, onExpire]);

  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className={`card rounded-md bg-base-100 shadow  px-3 ${className}`}>
        <div className="grid grid-flow-col auto-cols-max gap-0 text-center">
          <div className="flex flex-col">
            <span className="text-lg tabular-nums">Time Left: {pad(hours)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg tabular-nums">:{pad(minutes)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg tabular-nums">:{pad(seconds)}</span>
          </div>
        </div>
    </div>
  );
}

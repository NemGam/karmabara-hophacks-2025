// src/components/LevelCard.tsx
type LevelCardProps = {
    Level?: number; // big number
    progressPct?: number; // 0–100
    imgSrc?: string;
    className?: string; // optional extra classes for outer wrapper
};

export default function LevelCard({
    Level = 4,
    progressPct = 70,
    imgSrc = '/karma.png',
    className = '',
}: LevelCardProps) {
    const pct = Math.max(0, Math.min(200, Math.round(progressPct)));

    return (
        <div className={`basis-1/3 bg-base-200 border-4 border-gray-700 ${className}`}>
            <div className="p-0 px-6 flex items-start gap-34">
                <span className="text-3xl text-neutral leading-none self-start mt-3">Level:</span>
                <span className="text-[80px] font-extrabold text-neutral leading-none ml-auto">
                    {Level}
                </span>
            </div>

            <div className="p-6 pt-0">
                <p className="text-xl mb-3">
                    Karma to the next Level:
                    <span className="text-xl font-medium text-success ml-5"> {pct}/200</span>
                </p>

                {/* Tailwind-only simple progress */}
                <div className="w-full h-2 bg-gray-200 rounded-xl">
                    <div
                        className="h-full bg-success rounded-xl"
                        style={{ width: `${(pct / 200) * 100}%` }}
                        aria-label="progress"
                    />
                </div>
            </div>
        </div>
    );
}

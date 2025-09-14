import CountdownToNextMonday from "./misc/CountdownToNextMonday"

type WeeklyTrialProps = { raised?: number; goal?: number };

export default function WeeklyTrial({ raised = 2895 , goal = 4500 }: WeeklyTrialProps) {
  const pct = Math.max(0, Math.min(100, Math.round((raised / goal) * 100)));

  return (
    <div className="bg-base-200 border-4 border-gray-700">
      <div className="card-body p-6 gap-1">
        <h3 className="card-title text-2xl text-secondary">Community Quest</h3>
        <h3 className="card-title text-3xl">Save Choppy!</h3>
        <div className="flex flex-row items-center justify-between w-full gap-2 mt-2">
          <div className="text-lg font-bold text-success">300 Karma</div>
          <CountdownToNextMonday className=""/>
        </div>
        


        <p className="text-lg mt-5">Choppy, a beloved cat battling cancer, needs urgent treatment, yet full care awaits if we fund his medical costs before surgery next week. Donate to this Weekly Trial to save him!</p>


        <div className="flex items-end gap-8 mt-5">
          <div>
            <div className="text-xs uppercase opacity-70">Raised</div>
            <div className="text-3xl font-extrabold text-success">${raised}</div>
          </div>
          <div>
            <div className="text-xs uppercase opacity-70">Goal</div>
            <div className="text-2xl font-bold">${goal}</div>
          </div>
          <div className="ml-auto text-lg font-medium">{pct}%</div>
        </div>

        {/* Pixel progress */}
        <div className="relative h-6 w-full overflow-hidden bg-white border-2 border-black">
          {/* vertical bars over track and fill */}
          <div className="pointer-events-none absolute inset-0 z-20 opacity-70
                          bg-[repeating-linear-gradient(90deg,#000_0_1px,transparent_1px_12px)]" />
          {/* fill */}
          <div
            className="relative z-10 h-full bg-[linear-gradient(180deg,theme(colors.green.400)_0%,theme(colors.green.800)_100%)]"
            style={{ width: `${pct}%` }}
          />
          {/* top/bottom pixel lines */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/70 z-30" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-black z-30" />
        </div>

        <div className="card-actions mt-4">
          <a className="btn btn-primary text-lg w-full" target="_blank" rel="noopener noreferrer" href="https://www.gofundme.com/f/support-choppys-cancer-treatment/donate?source=btn_donate">Donate</a>
        </div>
        <br />
        
      </div>
    </div>
  );
}
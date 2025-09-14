import AchievementCard, { type Achievement } from './AchievementCard';

function Deeds({ achievements }: { achievements: Achievement[] }) {
    return (
        <div className="m-auto py-4">
            <h1 className="text-4xl font-bold text-center ">Your Virtues</h1>
            <h3 className="text-center text-lg mb-6">
                Track your progress and celebrate your milestones!
            </h3>
            <div className="grid gap-y-10 place-items-center [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
                {achievements.map((a) => (
                    <AchievementCard
                        key={a.id}
                        achievement={{
                            id: a.id,
                            name: a.name,
                            desc: a.desc,
                            icon_url: a.icon_url,
                            rarity: a.rarity,
                            completed_at: a.completed_at,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Deeds;

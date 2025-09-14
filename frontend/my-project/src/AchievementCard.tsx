export type Achievement = {
    id: string;
    name: string;
    desc: string;
    icon_url: string;
    rarity: string;
    completed_at: Date | undefined;
};

const rarityClasses = (r?: string) => {
    switch ((r || '').toLowerCase()) {
        case 'common':
            return 'bg-gray-300 text-gray-900';
        case 'uncommon':
            return 'bg-green-500 text-white';
        case 'rare':
            return 'bg-sky-500 text-white';
        case 'epic':
            return 'bg-fuchsia-600 text-white shadow-fuchsia-600';
        case 'legendary':
            return 'bg-amber-400 text-black shadow-amber-400';
        default:
            return 'bg-zinc-200 text-zinc-800';
    }
};

const rarityShadows = (r?: string) => {
    switch ((r || '').toLowerCase()) {
        case 'epic':
            return 'shadow-fuchsia-600';
        case 'legendary':
            return 'shadow-amber-400';
        default:
            return '';
    }
};

export default function AchievementCard({ achievement }: { achievement?: Achievement }) {
    const muted = achievement?.completed_at == undefined;
    console.log(achievement);
    const cardTone = muted ? 'border-gray-400 bg-base-200' : 'border-gray-700 bg-base-300';
    const titleTone = muted ? 'text-gray-500' : '';
    const descTone = muted ? 'text-gray-400' : '';
    const imgTone = muted ? 'grayscale opacity-60' : '';
    const badgeTone = muted ? 'bg-gray-300 text-gray-800' : rarityClasses(achievement?.rarity);
    const shadowTone = muted ? '' : rarityShadows(achievement?.rarity);

    return (
        <div
            className={`card border-4 ${cardTone} w-64 h-100 flex flex-col items-center text-center`}>
            <div className="card-body">
                <div className="relative w-48 h-48">
                    <img
                        src={`achievements/${achievement?.icon_url}.png`}
                        alt={achievement?.name}
                        className={`${imgTone}`}
                    />
                    <div className={`absolute top-0 left-0 rounded-full w-full h-full shadow-2xl ${shadowTone}`} />
                </div>

                <h2 className={`text-2xl font-bold ${titleTone}`}>{achievement?.name}</h2>
                <p className={`text-xl ${descTone}`}>{achievement?.desc}</p>

                <div className={`badge border-0 text-lg p-3 mx-auto ${badgeTone}`}>
                    {achievement?.rarity ?? 'unknown'}
                </div>
            </div>
        </div>
    );
}

export { AchievementCard };

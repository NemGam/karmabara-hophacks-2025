// src/pages/HallOfKnights.tsx
type Monk = { name: string; level: number };

type HallOfKnightsProps = {
    monks?: Monk[];
    currentUser?: string;
    currentUserLevel?: number;
};

const DEFAULT_MONKS: Monk[] = [
    { name: 'Jay Blue', level: 100000 },
    { name: 'Brother Karma', level: 1000 },
    { name: 'Brother Dharma', level: 999 },
    { name: 'Brother Merit', level: 998 },
    { name: 'Brother Samsara', level: 997 },
    { name: 'Brother Bodhi', level: 996 },
    { name: 'Brother Metta', level: 995 },
    { name: 'Brother Sila', level: 994 },
    { name: 'Brother Lotus', level: 993 },
    { name: 'Brother Nirvana', level: 992 },
];

export default function HallOfKnights({
    monks = DEFAULT_MONKS,
    currentUser = 'username',
    currentUserLevel = 4,
}: HallOfKnightsProps) {
    return (
        <main className="px-[20%] py-4">
            <h1 className="text-4xl font-bold text-center mb-4">Steps of Wisdom</h1>

            <div className="rounded-box border border-base-300 bg-base-100 shadow-sm">
                <div className="p-0">
                    <table className="table table-lg">
                        <thead className="bg-base-200">
                            <tr>
                                <th className="text-left text-xl">Name</th>
                                <th className="text-right text-xl">Level</th>
                            </tr>
                        </thead>

                        <tbody>
                            {monks.map((m) => (
                                <tr key={m.name} className="hover:bg-base-200/50">
                                    <td>{m.name}</td>
                                    <td className="text-right">{m.level}</td>
                                </tr>
                            ))}

                            <tr>
                                <td
                                    colSpan={2}
                                    className="text-center text-2xl text-base-content/50">
                                    …
                                </td>
                            </tr>

                            <tr className="hover:bg-base-200/50">
                                <td>Brother Juniper</td>
                                <td className="text-right">{currentUserLevel}</td>
                            </tr>

                            {/* current user highlighted */}
                            <tr className="bg-yellow-100 text-yellow-900 font-semibold">
                                <td>{currentUser}</td>
                                <td className="text-right">{currentUserLevel}</td>
                            </tr>

                            <tr className="hover:bg-base-200/50">
                                <td>Brother Leo</td>
                                <td className="text-right">{currentUserLevel}</td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={2}
                                    className="text-center text-2xl text-base-content/50">
                                    …
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

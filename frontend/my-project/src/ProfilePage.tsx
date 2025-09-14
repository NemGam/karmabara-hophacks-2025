import { useRef, useState } from 'react';
import OpenChest from './misc/OpenChess';
import { useProfile } from './hooks/useProfile';

type Profile = {
    first_name: string;
    last_name: string;
    email: string;
    bio: string;
    created_at: string; // "Joined Sep 2025"
    pfp: string;
    level: number;
    exp: number;
    events_completed: number;
    hours_volunteered: number;
};

const DEFAULT_PROFILE: Profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: '@jdoe317',
    bio: 'Tinkers with code and community projects.',
    created_at: 'Joined Jan 2025',
    pfp: '/logo.png',
    level: 15,
    exp: 70,
    events_completed: 12,
    hours_volunteered: 32,
};

export default function ProfilePage() {
    const scrollerRef = useRef<HTMLDivElement>(null);

    const { profile } = useProfile();
    console.log(profile);
    const joined = new Date(Date.parse(profile?.created_at));
    const [showToast, setShowToast] = useState(false);

    return (
        <main className="px-[20%] py-4 space-y-8">
            <h1 className="text-4xl font-bold text-center mb-6">Your Journey</h1>
            {/* Header */}
            <section className="border-4 border-gray-700 bg-base-300 shadow">
                <div className="card-body gap-6 md:flex-row md:items-center">
                    <div className="avatar">
                        <div className="w-25 h-25 rounded-full ring ring-primary ring-offset-2">
                            <img
                                src={profile?.pfp || '/logo.png'}
                                alt={`${profile?.first_name} avatar`}
                            />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold">
                            {profile?.first_name} {profile?.last_name}
                        </h1>
                        <div className="mt-1 text-lg opacity-70">
                            {profile?.email} ·
                            {'Joined ' +
                                joined.toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric',
                                })}
                        </div>
                        <p className="mt-3 text-lg">{profile?.bio}</p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
                <div className="p-2 bg-base-300  border-4 border-gray-700">
                    <div className="text-xl">Level</div>
                    <div className="stat-value text-warning text-2xl">{profile?.level}</div>
                    <div className="stat-desc text-xl">Global standing</div>
                </div>
                <div className="p-2 bg-base-300  border-4 border-gray-700">
                    <div className="text-xl">Karma</div>
                    <div className="stat-value text-error text-2xl">{profile?.exp}</div>
                    <div className="stat-desc text-xl">Total points</div>
                </div>
                <div className="p-2 bg-base-300  border-4 border-gray-700">
                    <div className="text-xl">Deeds</div>
                    <div className="stat-value text-2xl">{profile?.events_completed || 0}</div>
                    <div className="stat-desc text-xl">Completed</div>
                </div>
                <div className="p-2 bg-base-300  border-4 border-gray-700">
                    <div className="text-xl">Hours</div>
                    <div className="stat-value text-success text-2xl">
                        {profile?.hours_volunteered || 0}
                    </div>
                    <div className="stat-desc text-xl">Volunteered</div>
                </div>
            </section>

            <div className="relative">
                <img
                    src={`${profile?.background || '/bgg.png'}`}
                    alt="background"
                    className="absolute left-[50%] -translate-x-1/2 top-[20px] w-350 h-auto"
                />

                <img
                    src={`${profile?.floating_capa || '/FloatingBara.png'}`}
                    alt="Floating capybara"
                    className="absolute left-[50%] -translate-x-1/2 top-[280px] w-50 h-auto"
                />
            </div>
        </main>
    );
}

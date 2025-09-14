import WeeklyTrial from './WeeklyTrial';
import LevelCard from './RankCard';
import VolunteeringCard from './VolunteeringCard';
import { useProfile } from './hooks/useProfile';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents, registerForEvent } from './utils/dataFetchUtil';

function MainPage() {
    const { profile } = useProfile();
    const {
        data: events = [],
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ['events'],
        queryFn: () => fetchEvents(),
        staleTime: 25 * 60 * 1000, // 25 minutes
        refetchOnWindowFocus: false,
    });

    const registerOnEvent = async(eventId: string) => {
        if (!profile?.user_id) return;
        await registerForEvent(profile?.user_id, eventId);
    }

    return (
        <div className="mt-5 px-[10%] flex gap-2 h-[91vh]">
            <div className="basis-2/3 bg-base-100 flex flex-col items-center p-5 gap-5 overflow-y-auto ">
                <h1 className="text-3xl">
                    Greetings, traveler of Karmabara. Is it time to walk further along the path?
                </h1>
                <div className="">
                    {events.map((ev) => (
                        <VolunteeringCard key={ev.id}
                            event={ev}
                            className="mt-6"
                            onRegister={registerOnEvent}
                        />
                    ))}
                </div>
            </div>
            <div className="basis-1/3 ">
                <div className="flex flex-col gap-6 h-[70%]">
                    <LevelCard
                        className="h-1/3"
                        Level={profile?.level}
                        progressPct={profile?.exp}
                    />
                    <div className="basis-3/4 bg-base-200">
                        <WeeklyTrial />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;

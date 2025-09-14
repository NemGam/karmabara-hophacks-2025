import { useQuery } from '@tanstack/react-query';
import Deeds from './Virtues';
import { useProfile } from './hooks/useProfile';
import { fetchAchievements } from './utils/dataFetchUtil';


export function VirtuesPage() {
    const { profile } = useProfile();
    const userId = profile?.user_id ?? null;

    const {
        data: achievements = [],
        isPending,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['achievements', userId],
        queryFn: () => fetchAchievements(userId!),
        enabled: !!userId, // only run when we have a user id
        staleTime: 25 * 60 * 1000, // 25 minutes
        refetchOnWindowFocus: false,
    });


    if (!userId) return null;
    if (isPending) return <div>Loading achievements…</div>;
    if (isError)
        return (
            <div>
                Failed to load achievements: {(error as Error).message}{' '}
                <button onClick={() => refetch()}>Try again</button>
            </div>
        );
    return <Deeds achievements={achievements} />;
}

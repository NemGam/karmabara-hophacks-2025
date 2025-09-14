import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileContext } from "./profileContext";
import { fetchProfile } from "../utils/dataFetchUtil";

export type UserProfile = {
    user_id: string;
    first_name: string;
    last_name: string;
    pfp?: string;
    level: number;
    exp: number;
    hours: number;
    email: string;
    floating_capa?: string,
    background?: string
};


export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const userId = "0";
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['profile', userId],
        queryFn: () => fetchProfile(userId as string),
        enabled: !!userId, // ensure we have a user id
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const invalidateProfile = () => {
        queryClient.invalidateQueries({ queryKey: ['profile'] });
    };

    return (
        <ProfileContext.Provider
            value={{
                profile: query.data,
                isLoading: query.isLoading,
                refetch: query.refetch,
                invalidateProfile,
            }}>
            {children}
        </ProfileContext.Provider>
    );
};
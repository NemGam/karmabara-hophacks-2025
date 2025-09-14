import { createContext } from 'react';
import type { UserProfile } from './profileProvider';


type ProfileContextType = {
    profile: UserProfile | undefined;
    isLoading: boolean;
    refetch: () => void;
    invalidateProfile: () => void;
};

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);


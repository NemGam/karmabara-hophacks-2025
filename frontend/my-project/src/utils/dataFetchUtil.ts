import type { Achievement } from "../AchievementCard";

const API_URL = import.meta.env.VITE_API_URL;

export async function fetchEvents(): Promise<any[]> {
    const res = await fetch(`${API_URL}/v1/events`);
    if (!res.ok) throw new Error('Failed to load achievements');
    return res.json();
}

export async function registerForEvent(userId: string, eventId: string) {
    const res = await fetch(`${API_URL}/v1/events/${eventId}/register`, {
        method: 'POST',
        body: JSON.stringify({ userId: userId }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    await res.json();
    console.log(res);
    if (!res.ok) throw new Error('Failed to register');
    return eventId;
}

export async function fetchAchievements(userId: string): Promise<Achievement[]> {
    const res = await fetch(`${API_URL}/v1/users/${userId}/achievements`);
    if (!res.ok) throw new Error('Failed to load achievements');
    return res.json();
}

export type Event = {
    id: string;
    organizer_id: string;
    thumbnail_url?: string | null;
    name: string;
    desc: string;
    reward?: number | null;
    register_link: string;
    lat?: number | null;
    lon?: number | null;
    start_time: string;
    end_time: string;
};

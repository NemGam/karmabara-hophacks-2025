import type { Event } from './models/event.model';

const US_CITIES = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Antonio, TX',
    'San Diego, CA',
    'Dallas, TX',
    'San Jose, CA',
    'Austin, TX',
    'Jacksonville, FL',
    'Fort Worth, TX',
    'Columbus, OH',
    'Charlotte, NC',
    'San Francisco, CA',
    'Indianapolis, IN',
    'Seattle, WA',
    'Denver, CO',
    'Washington, DC',
    'Boston, MA',
    'Nashville, TN',
    'El Paso, TX',
    'Detroit, MI',
    'Portland, OR',
    'Las Vegas, NV',
    'Memphis, TN',
    'Louisville, KY',
    'Baltimore, MD',
    'Miami, FL',
];

const API_URL = import.meta.env.VITE_API_URL;

// deterministic pick per event
const pickCity = (seed: string) => {
    let h = 5381;
    for (let i = 0; i < seed.length; i++) h = ((h << 5) + h) ^ seed.charCodeAt(i);
    const idx = (h >>> 0) % US_CITIES.length;
    return US_CITIES[idx];
};

type VolunteeringCardProps = {
    event: Event;
    onRegister?: (eventId: string) => void;
    className?: string;
};

export default function VolunteeringCard({
    event,
    onRegister,
    className = '',
}: VolunteeringCardProps) {
    console.log(event);

    const title = event.name;
    const description = event.desc;
    const honor = event.reward ?? 0;
    const registerUrl = `${API_URL}/v1/events/${event.id}/register`;

    // ignore coords; assign a US city deterministically
    const location = pickCity(event.id ?? event.name);

    const start = new Date(event.start_time);
    const end = new Date(event.end_time);

    const date = start.toLocaleDateString(undefined, {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
    const time = `${start.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    })} – ${end.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;

    return (
        <div className={`bg-base-300 ${className}`}>
            <div className="card-body p-6 gap-4">
                <div className="card-title text-2xl ">{title}</div>
                <hr />
                <div className="text-lg opacity-70">{location}</div>
                <p className="text-lg">{description}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <div className="text-lg">
                        <span className="opacity-70">Date:</span> {date}
                    </div>
                    <div className="text-lg">
                        <span className="opacity-70">Time:</span> {time}
                    </div>
                    <div className="text-lg">
                        <span className="opacity-70">Karma:</span>
                        <span className="text-success text-xl ml-2">{honor}</span>
                    </div>
                </div>
                <div className="card-actions">
                    <button className="btn btn-primary w-full text-lg" onClick={() => onRegister?.(event.id)}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

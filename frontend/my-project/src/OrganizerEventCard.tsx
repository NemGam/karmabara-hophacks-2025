import { useEffect, useMemo, useState } from "react";
import type { Event } from "./models/event.model";

type Attendee = { id: string; name: string; email: string; present: boolean };

const US_CITIES = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Charlotte, NC",
  "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Washington, DC",
  "Boston, MA", "Nashville, TN", "El Paso, TX", "Detroit, MI", "Portland, OR",
  "Las Vegas, NV", "Memphis, TN", "Louisville, KY", "Baltimore, MD", "Miami, FL",
];
const pickCity = (seed: string) => {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h) ^ seed.charCodeAt(i);
  return US_CITIES[(h >>> 0) % US_CITIES.length];
};

type OrganizerCardProps = {
  event: Event;
  attendees: Attendee[];
  onSave?: (updated: Attendee[]) => void;
  className?: string;
};

export default function OrganizerEventCard({
  event,
  attendees,
  onSave,
  className = "",
}: OrganizerCardProps) {
  const [list, setList] = useState<Attendee[]>(attendees);
  useEffect(() => setList(attendees), [attendees]);

  const title = event.name;
  const description = event.desc;
  const honor = event.reward ?? 0;
  const location = useMemo(() => pickCity(event.id ?? event.name), [event.id, event.name]);

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);
  const date = start.toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" });
  const time = `${start.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} – ${end.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;

  const presentCount = list.filter(a => a.present).length;

  const toggleAll = (value: boolean) => setList(prev => prev.map(a => ({ ...a, present: value })));
  const toggleOne = (id: string) =>
    setList(prev => prev.map(a => (a.id === id ? { ...a, present: !a.present } : a)));

  return (
    <div className={`bg-base-100 ${className}`}>
      <div className="card-body p-6 gap-4">
        <div className="card-title text-2xl ">{title}</div>
        <hr />
        <div className="text-lg opacity-70">{location}</div>
        <p className="text-lg">{description}</p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="text-lg"><span className="opacity-70">Date:</span> {date}</div>
          <div className="text-lg"><span className="opacity-70">Time:</span> {time}</div>
          <div className="text-lg">
            <span className="opacity-70">Deeds:</span>
            <span className="text-success text-xl ml-2">{honor}</span>
          </div>
        </div>

        {/* Organizer-only section: attendance */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Attendees</h3>
            <div className="text-lg opacity-70">{presentCount}/{list.length} present</div>
          </div>

          <div className="mt-3 h-56 overflow-auto rounded border border-base-300">
            <table className="table table-lg">
              <thead>
                <tr>
                  <th className="w-12">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={presentCount === list.length && list.length > 0}
                      onChange={e => toggleAll(e.target.checked)}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {list.map(a => (
                  <tr key={a.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={a.present}
                        onChange={() => toggleOne(a.id)}
                      />
                    </td>
                    <td>{a.name}</td>
                    <td className="opacity-70">{a.email}</td>
                  </tr>
                ))}
                {list.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center opacity-70 py-6">No attendees yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex gap-2">
            <button className="btn btn-primary w-full text-lg" onClick={() => onSave?.(list)}>Save attendance</button>
          </div>
        </div>

        {/* No register action for organizer */}
      </div>
    </div>
  );
}

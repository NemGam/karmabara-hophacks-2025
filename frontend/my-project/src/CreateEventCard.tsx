import { useState } from "react";
import type { Event } from "./models/event.model";

export default function CreateEventCard({ onCreate }: { onCreate: (event: Event) => void }) {
  const [formData, setFormData] = useState<Omit<Event, "id" | "organizerId">>({
    thumbnailUrl: "",
    name: "",
    desc: "",
    reward: null,
    registerLink: "",
    lat: null,
    lon: null,
    startTime: "",
    endTime: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "reward" ? Number(value) || null : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newEvent: Event = {
      id: crypto.randomUUID(),
      organizerId: "demo-organizer", // replace with real organizerId
      ...formData,
    };
    onCreate(newEvent);
  }

  return (
    <div className="max-w-md p-4 border border-gray-300 border-2 shadow">
      <h2 className="text-xl font-semibold mb-2">Create Event</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2  text-lg"
          required
        />
        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          className="border p-2  text-lg"
          required
        />
        <input
          name="reward"
          type="number"
          placeholder="Reward"
          value={formData.reward ?? ""}
          onChange={handleChange}
          className="border p-2  text-lg"
        />
        <input
          name="registerLink"
          placeholder="Registration Link"
          value={formData.registerLink}
          onChange={handleChange}
          className="border p-2  text-lg"
          required
        />
        <input
          name="location"
          placeholder="Location"
          className="border p-2  text-lg"
          required
        />
        <h6 className="text-lg font-semibold"  >Event Start Time</h6>
        <input
          name="startTime"
          type="datetime-local"
          value={formData.startTime}
          onChange={handleChange}
          className="border p-2 text-lg"
          required
        />
        <h6 className="text-lg font-semibold"  >Event End Time</h6>
        <input
          name="endTime"
          type="datetime-local"
          value={formData.endTime}
          onChange={handleChange}
          className="border p-2 text-lg"
          required
        />
        <button type="submit" className="bg-primary text-white p-2 text-lg">
          Create
        </button>
      </form>
    </div>
  );
}

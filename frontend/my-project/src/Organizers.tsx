import CreateEventCard from "./CreateEventCard";
import OrganizerEventCard from "./OrganizerEventCard";


function Organizers() {
    return (
        <div className="mt-5 px-[20%] flex gap-2 h-[91vh]">
            <div className="basis-2/3 bg-base-300 flex flex-col items-center p-5 gap-5 overflow-y-auto ">
                <h1 className="text-3xl text-left w-auto">Manage your events</h1>
                <div className=''>
                    <OrganizerEventCard
                        event={{
                            id: "evt_beach_cleanup_1",
                            organizerId: "org_miami_cleanups",
                            thumbnailUrl: null,
                            name: "Beach Cleanup Day",
                            desc: "Help remove trash and microplastics from shoreline and dunes. Gloves and bags provided. Family friendly.",
                            reward: 40,
                            registerLink: "https://miamicleanups.org/register",
                            lat: 25.7650,
                            lon: -80.1360,
                            startTime: "2025-09-28T08:00:00-04:00",
                            endTime: "2025-09-28T11:30:00-04:00",

                        }}
                        className="mt-6"
                        attendees={[
                            { id: "att_1", name: "Alice Johnson", email: "alice@example.com", present: false },
                            { id: "att_2", name: "Bob Smith", email: "bob@example.com", present: false },
                        ]}
                    />
                </div>
            </div>
            <div className="basis-1/3 ">
                <div className="flex flex-col gap-6 h-[70%]">
                    <div className="flex flex-col gap-6 h-[70%]">
                        <CreateEventCard onCreate={(event) => console.log(event)} />
                        <div className="basis-3/4 bg-base-200">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Organizers;
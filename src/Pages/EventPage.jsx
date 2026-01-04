import { useEffect, useState } from "react";
import UserEventCard from "../components/UserEventCard";
import EventRegistrationForm from "../components/EventRegistrationForm";

import { getAllEvents } from "../services/events/event.api";
import { getMyTeam } from "../services/teams/index";
import { registerForEvent } from "../services/events/eventRegistraion.api";
import api from "../services/auth/index";
import { toast } from "react-hot-toast";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState(null); // approved team or null
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState({});

  // FETCH EVENTS + TEAM

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const eventsRes = await getAllEvents();
        // console.log("eventsRes", eventsRes.data.data);
        setEvents(eventsRes.data.data);

        try {
          const teamRes = await getMyTeam();
          console.log("teamRes", teamRes.data);
          setTeam(teamRes.data);
          const evs = eventsRes.data.data || [];
          if (teamRes.data && evs.length) {
            const checks = await Promise.all(
              evs.map((e) =>
                api.get(`/api/events/${e._id}/my-registration`).then((r) => ({
                  eventId: e._id,
                  registered: Boolean(r.data.data),
                }))
              )
            );
            const map = {};
            checks.forEach((c) => (map[c.eventId] = c.registered));
            setAlreadyRegistered(map);
          } else {
            setAlreadyRegistered({});
          }
        } catch {
          setTeam(null);
          setAlreadyRegistered({});
        }
      } catch {
        setError("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // REGISTER HANDLER

  const handleRegister = async (data) => {
    try {
      await registerForEvent(selectedEvent._id, data);
      toast.success("Registered successfully (Pending approval)");
      setSelectedEvent(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // RENDER GUARDS

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf6ee] flex justify-center items-center">
        <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mb-4"></div>
          <p className="text-stone-500 font-medium">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-[#fbf6ee] py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
      {/* No team warning */}
      {!team && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-sm text-stone-800">
          You must be part of an approved team to register for events.
        </div>
      )}

      {/* Events */}
      {events.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-medium">No upcoming events</p>
        </div>
      ) : (
        events.map((event) => (
          <UserEventCard
            key={event._id}
            event={event}
            canRegister={Boolean(team) && !alreadyRegistered[event._id]}
            onRegister={setSelectedEvent}
          />
        ))
      )}

      {/* Registration modal */}
      {selectedEvent && team && (
        <EventRegistrationForm
          event={selectedEvent}
          team={team}
          bullPairs={team.bullPairs}
          teamMembers={team.teamMembers}
          onSubmit={handleRegister}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import UserEventCard from "../components/UserEventCard";
import EventRegistrationForm from "../components/EventRegistrationForm";

import { getAllEvents } from "../services/events/event.api";
import { getMyTeam } from "../services/teams/index";
import { registerForEvent } from "../services/events/eventRegistraion.api";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState(null); // approved team or null
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        } catch {
          setTeam(null);
        }
      } catch (err) {
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
      alert("Registered successfully (Pending approval)");
      setSelectedEvent(null);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  // RENDER GUARDS

  if (loading) {
    return <p className="text-gray-500">Loading events…</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-4">
      {/* No team warning */}
      {!team && (
        <div className="bg-yellow-50 border border-yellow-300 p-3 rounded text-sm">
          You must be part of an <b>approved team</b> to register for events.
        </div>
      )}

      {/* Events */}
      {events.length === 0 ? (
        <p className="text-gray-500">No upcoming events</p>
      ) : (
        events.map((event) => (
          <UserEventCard
            key={event._id}
            event={event}
            canRegister={Boolean(team)}
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
  );
}

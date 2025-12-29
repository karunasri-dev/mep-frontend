import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import EventForm from "../components/Event/EventForm";
import EventCard from "../components/Event/EventCard";
import {
  getAllEvents,
  createEvent,
  updateEventDetails,
  deleteEvent,
} from "../../services/events/event.api";

export default function EventManagement() {
  const [events, setEvents] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ==============================
     FETCH EVENTS (ON LOAD)
     ============================== */
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await getAllEvents();
      // console.log("Event data.....", res.data);
      setEvents(res.data.data);
    } catch (err) {
      console.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     HANDLERS
     ============================== */
  const handleAdd = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingEvent) {
        const res = await updateEventDetails(editingEvent._id, data);
        setEvents((prev) =>
          prev.map((e) => (e._id === editingEvent._id ? res.data.data : e))
        );
      } else {
        const res = await createEvent(data);
        setEvents((prev) => [res.data.data, ...prev]);
      }

      setIsFormOpen(false);
    } catch (err) {
      console.log(err.message || err || "Saving failed");
    }
  };

  /* ==============================
     RENDER
     ============================== */
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-gray-900 mb-2">Event Management</h2>
          <p className="text-gray-600">
            Create, update, and manage bull race events
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center py-10">
            <EventForm
              initialData={editingEvent}
              onSubmit={handleSubmit}
              onClose={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No events created yet.
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onEdit={() => handleEdit(event)}
              onDelete={() => handleDelete(event._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

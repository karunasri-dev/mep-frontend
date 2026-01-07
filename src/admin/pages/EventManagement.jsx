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
import Swal from "sweetalert2";

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
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "Are you sure you want to delete this event? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;

    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch {
      Swal.fire("Error", "Delete failed", "error");
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
    <div className="min-h-screen bg-[#fbf6ee] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-stone-800 font-medium mb-2">
              Event Management
            </h1>
            <p className="text-stone-600">
              Create, update, and manage bull race events
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>

        {isFormOpen && (
          <EventForm
            initialData={editingEvent}
            onSubmit={handleSubmit}
            onClose={() => setIsFormOpen(false)}
          />
        )}

        {loading ? (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mb-4"></div>
            <p className="text-stone-500 font-medium">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
            <p className="text-stone-500 font-medium">No events created yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onEdit={() => handleEdit(event)}
                onDelete={() => handleDelete(event._id)}
                // Pass a dummy handler or update logic if needed for state update from card
                onStateUpdate={(updatedEvent) => {
                  setEvents((prev) =>
                    prev.map((e) =>
                      e._id === updatedEvent._id ? updatedEvent : e
                    )
                  );
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

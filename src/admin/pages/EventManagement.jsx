import { useState } from "react";
import { Plus } from "lucide-react";
import EventForm from "../components/Event/EventForm";
import EventCard from "../components/Event/EvenCard";
export default function EventManagement() {
  const [events, setEvents] = useState([
    {
      id: "1",
      name: "Summer Bull Race 2025",
      date: "2025-12-20",
      location: "Mangalore Arena",
      maxParticipants: 50,
      registeredCount: 23,
      prizeAmount: "₹5,00,000",
      status: "upcoming",
    },
    {
      id: "2",
      name: "Winter Championship 2025",
      date: "2026-01-15",
      location: "Udupi Stadium",
      maxParticipants: 40,
      registeredCount: 12,
      prizeAmount: "₹3,00,000",
      status: "upcoming",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleAdd = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id));
    }
  };

  const handleSubmit = (data) => {
    if (editingEvent) {
      setEvents(
        events.map((e) => (e.id === editingEvent.id ? { ...e, ...data } : e))
      );
    } else {
      setEvents([
        ...events,
        {
          id: Date.now().toString(),
          ...data,
          registeredCount: 0,
        },
      ]);
    }

    setIsFormOpen(false);
  };

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
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
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

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No events created yet. Click "Add Event" to create one.
          </div>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => handleEdit(event)}
              onDelete={() => handleDelete(event.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

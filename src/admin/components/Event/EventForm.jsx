import { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

export default function EventForm({ initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    maxParticipants: "",
    prizeAmount: "",
    status: "upcoming",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        date: initialData.date,
        location: initialData.location,
        maxParticipants: initialData.maxParticipants.toString(),
        prizeAmount: initialData.prizeAmount,
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      date: formData.date,
      location: formData.location,
      maxParticipants: parseInt(formData.maxParticipants),
      prizeAmount: formData.prizeAmount,
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-gray-900">
            {initialData ? "Edit Event" : "Add New Event"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="input"
              placeholder="Enter event name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="input"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="input"
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">
                Max Participants
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.maxParticipants}
                onChange={(e) =>
                  setFormData({ ...formData, maxParticipants: e.target.value })
                }
                className="input"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Prize Amount</label>
              <input
                type="text"
                required
                value={formData.prizeAmount}
                onChange={(e) =>
                  setFormData({ ...formData, prizeAmount: e.target.value })
                }
                className="input"
                placeholder="e.g., ₹5,00,000"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="input"
            >
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              <Save className="w-5 h-5" />
              {initialData ? "Update Event" : "Create Event"}
            </button>

            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

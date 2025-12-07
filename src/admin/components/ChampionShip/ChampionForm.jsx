import { useState } from "react";
import { Save } from "lucide-react";

export default function ChampionForm({
  completedEvents,
  initialData,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(
    initialData || {
      eventId: "",
      winnerName: "",
      bullName: "",
      raceTime: "",
      prizeAmount: "",
      notes: "",
    }
  );

  const update = (key, value) => setFormData({ ...formData, [key]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Event */}
      <div>
        <label className="block text-gray-700 mb-2">Event</label>
        <select
          required
          value={formData.eventId}
          onChange={(e) => update("eventId", e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Select an event</option>
          {completedEvents.map((event) => (
            <option key={event.id} value={event.id}>
              {event.name} - {new Date(event.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {/* Winner + Bull */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Winner Name</label>
          <input
            type="text"
            required
            value={formData.winnerName}
            onChange={(e) => update("winnerName", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Bull Name</label>
          <input
            type="text"
            required
            value={formData.bullName}
            onChange={(e) => update("bullName", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Race + Prize */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Race Time</label>
          <input
            type="text"
            required
            value={formData.raceTime}
            onChange={(e) => update("raceTime", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Prize Amount</label>
          <input
            type="text"
            required
            value={formData.prizeAmount}
            onChange={(e) => update("prizeAmount", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-gray-700 mb-2">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg"
        >
          <Save className="w-5 h-5" />
          {initialData ? "Update Champion" : "Add Champion"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

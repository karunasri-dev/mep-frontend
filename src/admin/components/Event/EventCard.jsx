import { Edit2, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { updateEventState } from "../../../services/events/event.api";

export default function EventCard({ event, onEdit, onDelete, onStateUpdate }) {
  const getNextStateOptions = () => {
    if (event.state === "UPCOMING") return ["ONGOING"];
    if (event.state === "ONGOING") return ["COMPLETED"];
    return [];
  };

  const handleStateChange = async (e) => {
    const newState = e.target.value;
    if (!newState) return;

    try {
      const res = await updateEventState(event._id, newState);
      onStateUpdate(res.data.data);
    } catch (err) {
      console.log(err || err?.message || "Failed to update state");
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3>{event.title}</h3>
            <StatusBadge status={event.state} />
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {new Date(event.timings.from).toLocaleString()} →{" "}
            {new Date(event.timings.to).toLocaleString()}
          </p>

          {getNextStateOptions().length > 0 && (
            <select
              onChange={handleStateChange}
              className="input mt-3 max-w-xs"
              defaultValue=""
            >
              <option value="" disabled>
                Change status
              </option>
              {getNextStateOptions().map((s) => (
                <option key={s} value={s}>
                  Mark as {s}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex gap-2">
          <button onClick={onEdit} className="btn-secondary">
            <Edit2 className="w-4 h-4" /> Edit
          </button>

          <button onClick={onDelete} className="btn-danger">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

import { Edit2, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function EventCard({ event, onEdit, onDelete }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-gray-900">{event.name}</h3>
            <StatusBadge status={event.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Date</p>
              <p className="text-gray-900">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Location</p>
              <p className="text-gray-900">{event.location}</p>
            </div>

            <div>
              <p className="text-gray-500">Participants</p>
              <p className="text-gray-900">
                {event.registeredCount} / {event.maxParticipants}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Prize</p>
              <p className="text-gray-900">{event.prizeAmount}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onEdit} className="btn-secondary">
            <Edit2 className="w-4 h-4" />
            Edit
          </button>

          <button onClick={onDelete} className="btn-danger">
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

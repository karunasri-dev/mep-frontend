import { Link } from "react-router-dom";

export default function UserEventCard({ event, onRegister, canRegister }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">
          <Link to={`/events/${event._id}`} className="hover:text-blue-600">
            {event.title}
          </Link>
        </h3>
        <span
          className={`px-2 py-0.5 rounded text-xs font-medium ${
            event.state === "ONGOING"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {event.state}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-2">
        {new Date(event.timings.from).toLocaleString()} –{" "}
        {new Date(event.timings.to).toLocaleString()}
      </p>

      <p className="text-sm mt-1 text-gray-500">{event.location}</p>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-medium text-gray-900">
          Prize: ₹{event.prizeMoney.toLocaleString()}
        </p>
        <Link
          to={`/events/${event._id}`}
          className="text-sm text-blue-600 hover:underline"
        >
          View Details
        </Link>
      </div>

      {event.state === "UPCOMING" && canRegister && (
        <button
          onClick={() => onRegister(event)}
          className="btn-primary w-full mt-4"
        >
          Register for Event
        </button>
      )}
    </div>
  );
}

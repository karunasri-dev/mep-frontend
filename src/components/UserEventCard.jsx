import { Link } from "react-router-dom";

export default function UserEventCard({ event, onRegister, canRegister }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 hover:border-amber-400 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-serif font-medium text-stone-800">
          <Link to={`/events/${event._id}`} className="hover:text-amber-700">
            {event.title}
          </Link>
        </h3>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            event.state === "ONGOING"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-stone-100 text-stone-600 border-stone-200"
          }`}
        >
          {event.state}
        </span>
      </div>

      <p className="text-sm text-stone-600 mt-2">
        {new Date(event.timings.from).toLocaleString()} –{" "}
        {new Date(event.timings.to).toLocaleString()}
      </p>

      <p className="text-sm mt-1 text-stone-500">{event.location}</p>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-medium text-stone-800">
          Prize: ₹{event.prizeMoney.toLocaleString()}
        </p>
        <Link
          to={`/events/${event._id}`}
          className="text-sm text-amber-700 hover:underline"
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

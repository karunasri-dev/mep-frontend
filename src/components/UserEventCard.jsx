export default function UserEventCard({ event, onRegister }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold">{event.title}</h3>

      <p className="text-sm text-gray-600 mt-1">
        {new Date(event.timings.from).toLocaleString()} –{" "}
        {new Date(event.timings.to).toLocaleString()}
      </p>

      <p className="text-sm mt-1">{event.location}</p>

      <p className="mt-2 font-medium">
        Prize: ₹{event.prizeMoney.toLocaleString()}
      </p>

      {event.state === "UPCOMING" && (
        <button onClick={() => onRegister(event)} className="btn-primary mt-4">
          Register for Event
        </button>
      )}
    </div>
  );
}

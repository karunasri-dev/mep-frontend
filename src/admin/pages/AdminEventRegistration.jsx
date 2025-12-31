import { useEffect, useState } from "react";
import {
  fetchEventRegistrations,
  updateRegistrationStatus,
} from "../api/adminRegistration.api";

export default function AdminEventRegistrations({ eventId }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetchEventRegistrations(eventId);
      setRegistrations(res.data.data);
      setLoading(false);
    };
    load();
  }, [eventId]);

  const handleAction = async (id, status) => {
    const reason =
      status === "REJECTED" ? prompt("Enter rejection reason") : null;

    const res = await updateRegistrationStatus(id, status, reason);

    setRegistrations((prev) =>
      prev.map((r) => (r._id === id ? res.data.data : r))
    );
  };

  if (loading) return <p>Loading registrations…</p>;

  return (
    <div className="space-y-3">
      {registrations.map((r) => (
        <div key={r._id} className="border p-3 rounded flex justify-between">
          <div>
            <p className="font-medium">{r.team.teamName}</p>
            <p className="text-sm text-gray-600">Captain: {r.captainName}</p>
            <p className="text-xs text-gray-500">Status: {r.status}</p>
          </div>

          {r.status === "PENDING" && (
            <div className="flex gap-2">
              <button
                className="btn-primary"
                onClick={() => handleAction(r._id, "APPROVED")}
              >
                Approve
              </button>
              <button
                className="btn-danger"
                onClick={() => handleAction(r._id, "REJECTED")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

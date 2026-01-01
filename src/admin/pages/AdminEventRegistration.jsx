import { useEffect, useState } from "react";
import {
  fetchEventRegistrations,
  updateRegistrationStatus,
} from "../../services/events/eventRegistraion.api";
import { getAllEvents } from "../../services/events/event.api";
import { Check, X, ChevronDown } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminEventRegistrations() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null); // ID of processing item

  // Modal State
  const [rejectModal, setRejectModal] = useState({ open: false, id: null });
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      loadRegistrations(selectedEventId);
    } else {
      setRegistrations([]);
    }
  }, [selectedEventId]);

  const loadEvents = async () => {
    try {
      const res = await getAllEvents();
      // Assuming res.data.data.events or res.data.data depending on API structure
      // Based on event.controller.js usually it returns { data: [...] }
      const eventList = res.data.data?.events || res.data.data || [];
      setEvents(eventList);
      if (eventList.length > 0) {
        setSelectedEventId(eventList[0]._id);
      }
    } catch (err) {
      console.error("Failed to load events", err);
      toast.error("Failed to load events");
    }
  };

  const loadRegistrations = async (eventId) => {
    setLoading(true);
    try {
      const res = await fetchEventRegistrations(eventId);
      setRegistrations(res.data.data);
    } catch (err) {
      console.error("Failed to load registrations", err);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this registration?")) return;

    setActionLoading(id);
    try {
      const res = await updateRegistrationStatus(id, "APPROVED");
      updateLocalStatus(id, res.data.data);
      toast.success("Registration Approved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (id) => {
    setRejectModal({ open: true, id });
    setRejectReason("");
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast.error("Reason is required");
      return;
    }

    setActionLoading(rejectModal.id);
    try {
      const res = await updateRegistrationStatus(
        rejectModal.id,
        "REJECTED",
        rejectReason
      );
      updateLocalStatus(rejectModal.id, res.data.data);
      toast.success("Registration Rejected");
      setRejectModal({ open: false, id: null });
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(null);
    }
  };

  const updateLocalStatus = (id, updatedData) => {
    setRegistrations((prev) =>
      prev.map((r) => (r._id === id ? updatedData : r))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Registration Approval
        </h1>

        {/* Event Selector */}
        <div className="relative min-w-[250px]">
          <select
            className="w-full pl-4 pr-10 py-2 border rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
          >
            {events.map((e) => (
              <option key={e._id} value={e._id}>
                {e.title}
              </option>
            ))}
            {events.length === 0 && <option>No events found</option>}
          </select>
          <ChevronDown
            className="absolute right-3 top-3 text-gray-500 pointer-events-none"
            size={16}
          />
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading registrations...
          </div>
        ) : registrations.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No registrations found for this event.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Team
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Captain
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Registered By
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Submitted At
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.map((r) => (
                  <tr
                    key={r._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {r.team?.teamName || "Unknown Team"}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{r.captainName}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <div>{r.registeredBy?.username}</div>
                      <div className="text-xs text-gray-400">
                        {r.registeredBy?.mobileNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(r.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      {r.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => handleApprove(r._id)}
                            disabled={actionLoading === r._id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 hover:bg-green-100 rounded border border-green-200 text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            onClick={() => openRejectModal(r._id)}
                            disabled={actionLoading === r._id}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded border border-red-200 text-sm font-medium transition-colors disabled:opacity-50"
                          >
                            <X size={14} /> Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-bold mb-4">Reject Registration</h3>
            <textarea
              className="w-full border rounded p-2 mb-4 focus:ring-2 focus:ring-red-500 outline-none"
              rows="4"
              placeholder="Enter reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRejectModal({ open: false, id: null })}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={
                  !rejectReason.trim() || actionLoading === rejectModal.id
                }
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading === rejectModal.id
                  ? "Rejecting..."
                  : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

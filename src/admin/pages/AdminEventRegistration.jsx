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

  const updateLocalStatus = (id, updatedReg) => {
    setRegistrations((prev) =>
      prev.map((r) => (r._id === id ? updatedReg : r))
    );
  };

  return (
    <div className="min-h-screen bg-[#fbf6ee] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif text-stone-800 font-medium mb-2">
              Event Registrations
            </h1>
            <p className="text-stone-600">
              Manage participant registrations for your events
            </p>
          </div>
          
          {/* Event Selector */}
          <div className="relative">
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="appearance-none w-full md:w-64 bg-white border border-stone-200 text-stone-700 py-2.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm cursor-pointer"
            >
              {events.map((evt) => (
                <option key={evt._id} value={evt._id}>
                  {evt.name}
                </option>
              ))}
              {events.length === 0 && <option>No events found</option>}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
            <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mb-4"></div>
            <p className="text-stone-500 font-medium">Loading registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
            <p className="text-stone-500 font-medium">
              No registrations found for this event.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Team / Owner
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Bulls
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {registrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-stone-800">
                          {reg.teamId?.teamName || "Unknown Team"}
                        </div>
                        <div className="text-sm text-stone-500">
                          {reg.teamId?.owner?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-stone-600 text-sm">
                        {reg.bulls?.map(b => b.name).join(" & ") || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                          {reg.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            reg.status === "APPROVED"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : reg.status === "REJECTED"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : "bg-amber-50 text-amber-700 border-amber-100"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {reg.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleApprove(reg._id)}
                              disabled={actionLoading === reg._id}
                              className="inline-flex items-center justify-center w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors border border-emerald-200"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openRejectModal(reg._id)}
                              disabled={actionLoading === reg._id}
                              className="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {rejectModal.open && (
          <div className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 border border-stone-200">
              <h3 className="text-xl font-serif text-stone-800 mb-4">
                Reject Registration
              </h3>
              <textarea
                className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none resize-none text-stone-700 mb-4"
                rows="3"
                placeholder="Enter reason for rejection..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              ></textarea>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setRejectModal({ open: false, id: null })}
                  className="px-4 py-2 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading === rejectModal.id}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
                >
                  {actionLoading === rejectModal.id ? "Rejecting..." : "Confirm Reject"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

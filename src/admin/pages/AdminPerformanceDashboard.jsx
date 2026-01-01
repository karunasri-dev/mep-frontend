import { useState, useEffect } from "react";
import {
  getAllEvents,
} from "../../services/events/event.api";
import {
  getApprovedTeams,
  recordTeamPerformance,
} from "../../services/events/performance.api";
import toast from "react-hot-toast";
import { CheckCircle, Lock, PlayCircle, Trophy } from "lucide-react";

export default function AdminPerformanceDashboard() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recordingId, setRecordingId] = useState(null); // ID of team being recorded
  
  // Form State
  const [formData, setFormData] = useState({
    distanceCovered: "",
    timeTaken: "",
    rockWeight: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventId) {
      fetchTeams(selectedEventId);
    } else {
      setTeams([]);
    }
  }, [selectedEventId]);

  const fetchEvents = async () => {
    try {
      const res = await getAllEvents();
      // Only show events that are NOT COMPLETED? Or all events?
      // User said "Performance can be recorded only when event status is LIVE".
      // But maybe we want to view past records too. I'll show all but indicate status.
      setEvents(res.data.data);
    } catch (err) {
      toast.error("Failed to load events");
    }
  };

  const fetchTeams = async (eventId) => {
    setLoading(true);
    try {
      const res = await getApprovedTeams(eventId);
      setTeams(res.data.data);
    } catch (err) {
      toast.error("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  const handleRecordClick = (team) => {
    setRecordingId(team.team._id);
    setFormData({
      distanceCovered: "",
      timeTaken: "",
      rockWeight: "",
    });
  };

  const handleCancel = () => {
    setRecordingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventId || !recordingId) return;

    try {
      await recordTeamPerformance(selectedEventId, {
        teamId: recordingId,
        distanceCovered: Number(formData.distanceCovered),
        timeTaken: Number(formData.timeTaken),
        rockWeight: Number(formData.rockWeight),
      });

      toast.success("Performance recorded successfully");
      setRecordingId(null);
      fetchTeams(selectedEventId); // Refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to record performance");
    }
  };

  const selectedEvent = events.find((e) => e._id === selectedEventId);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Performance Dashboard</h1>
        {selectedEvent && (
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              selectedEvent.state === "ONGOING"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Status: {selectedEvent.state}
          </span>
        )}
      </div>

      {/* Event Selector */}
      <div className="mb-8 bg-white p-4 rounded-lg border shadow-sm">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Active Event
        </label>
        <select
          className="w-full md:w-1/2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">-- Choose Event --</option>
          {events.map((evt) => (
            <option key={evt._id} value={evt._id}>
              {evt.title} ({new Date(evt.timings.from).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

      {/* Teams List */}
      {selectedEventId && (
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="font-semibold text-gray-700">Team Run Order</h2>
            <span className="text-sm text-gray-500">
              {teams.length} Teams Qualified
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading teams...</div>
          ) : teams.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No approved teams found for this event.
            </div>
          ) : (
            <div className="divide-y">
              {teams.map((item) => (
                <div
                  key={item.registrationId}
                  className={`p-4 transition-colors ${
                    item.hasPlayed ? "bg-green-50/50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Team Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                        {item.registrationOrder}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.team.teamName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Captain: {item.captainName}
                        </p>
                      </div>
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center gap-4">
                      {item.hasPlayed ? (
                        <div className="flex items-center gap-2 text-green-700 font-medium bg-green-100 px-3 py-1.5 rounded-full text-sm">
                          <CheckCircle size={16} />
                          <span>Recorded</span>
                        </div>
                      ) : recordingId === item.team._id ? (
                        // Recording Form
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col md:flex-row gap-2 items-end"
                        >
                          <div>
                            <label className="text-xs text-gray-500 block">Dist (m)</label>
                            <input
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              className="w-24 p-1 border rounded text-sm"
                              value={formData.distanceCovered}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  distanceCovered: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block">Time (s)</label>
                            <input
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              className="w-24 p-1 border rounded text-sm"
                              value={formData.timeTaken}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  timeTaken: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 block">Weight (kg)</label>
                            <input
                              type="number"
                              required
                              min="0"
                              step="0.01"
                              className="w-24 p-1 border rounded text-sm"
                              value={formData.rockWeight}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  rockWeight: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="flex gap-1">
                            <button
                              type="submit"
                              className="px-3 py-1.5 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={handleCancel}
                              className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        // Record Button
                        <button
                          onClick={() => handleRecordClick(item)}
                          disabled={selectedEvent.state !== "ONGOING"}
                          title={
                            selectedEvent.state !== "ONGOING"
                              ? "Event must be LIVE to record"
                              : ""
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                            selectedEvent.state === "ONGOING"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {selectedEvent.state !== "ONGOING" ? (
                            <Lock size={16} />
                          ) : (
                            <PlayCircle size={16} />
                          )}
                          Record Run
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

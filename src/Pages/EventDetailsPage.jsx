import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApprovedTeams, getLeaderboard } from "../services/events/performance.api";
import { getEventById } from "../services/events/event.api";
import { Trophy, Clock, MapPin, Calendar, Activity } from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("teams"); // 'teams' | 'leaderboard'

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [eventRes, teamsRes, leaderboardRes] = await Promise.all([
        getEventById(id),
        getApprovedTeams(id),
        getLeaderboard(id),
      ]);

      setEvent(eventRes.data.data);
      setApprovedTeams(teamsRes.data.data);
      setLeaderboard(leaderboardRes.data.data);
    } catch (err) {
      console.error("Failed to load event details", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading event details...</div>;
  if (!event) return <div className="p-8 text-center text-red-500">Event not found</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Event Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={18} />
                <span>{new Date(event.timings.from).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={18} />
                <span>{new Date(event.timings.from).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={18} />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1 font-medium text-green-600">
                <Trophy size={18} />
                <span>₹{event.prizeMoney.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              event.state === "ONGOING"
                ? "bg-green-100 text-green-800 animate-pulse"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {event.state}
          </span>
        </div>
        <p className="mt-4 text-gray-600">{event.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === "teams"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("teams")}
        >
          Participating Teams
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === "leaderboard"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("leaderboard")}
        >
          Leaderboard
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === "teams" && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">Approved Teams (Order of Play)</h3>
              <span className="text-sm text-gray-500">{approvedTeams.length} Teams</span>
            </div>
            {approvedTeams.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No teams approved yet.</div>
            ) : (
              <div className="divide-y">
                {approvedTeams.map((item) => (
                  <div 
                    key={item.registrationId} 
                    onClick={() => navigate(`/events/${id}/teams/${item.team._id}`)}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {item.registrationOrder}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.team.teamName}
                        </p>
                        <p className="text-sm text-gray-500">Captain: {item.captainName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.hasPlayed ? (
                        <span className="flex items-center gap-1 text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                          <Activity size={12} /> Played
                        </span>
                      ) : (
                        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Pending
                        </span>
                      )}
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-700">Live Standings</h3>
            </div>
            {leaderboard.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No performance data yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-6 py-3">Rank</th>
                      <th className="px-6 py-3">Team</th>
                      <th className="px-6 py-3 text-right">Distance</th>
                      <th className="px-6 py-3 text-right">Time</th>
                      <th className="px-6 py-3 text-right">Rock Weight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {leaderboard.map((perf, index) => (
                      <tr key={perf._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-100 text-yellow-700' :
                            index === 1 ? 'bg-gray-200 text-gray-700' :
                            index === 2 ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-50 text-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {perf.team.teamName}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          {perf.distanceCovered} m
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">
                          {perf.timeTaken} s
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">
                          {perf.rockWeight} kg
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

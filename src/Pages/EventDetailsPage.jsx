import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getApprovedTeams,
  getLeaderboard,
} from "../services/events/performance.api";
import { getEventById } from "../services/events/event.api";
import {
  Trophy,
  Clock,
  MapPin,
  Calendar,
  Activity,
  ChevronRight,
} from "lucide-react";

export default function EventDetailsPage() {
  const { id } = useParams();
  console.log("Event Id", id);
  const [event, setEvent] = useState(null);
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("teams"); // 'teams' | 'leaderboard'
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);

    const eventPromise = getEventById(id);
    const teamsPromise = getApprovedTeams(id);

    console.log("Calling...");
    const [eventRes, teamsRes] = await Promise.all([
      eventPromise,
      teamsPromise,
    ]);

    console.log("eventRes", eventRes.data.data);
    console.log("teamsRes", teamsRes.data.data);

    setEvent(eventRes.data.data);
    setApprovedTeams(teamsRes.data.data);
    setLoading(false);

    // Load leaderboard lazily
    getLeaderboard(id).then((res) => setLeaderboard(res.data.data));
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#fbf6ee] flex justify-center items-center">
        <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mb-4"></div>
          <p className="text-stone-500 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  if (!event)
    return (
      <div className="min-h-screen bg-[#fbf6ee] flex justify-center items-center">
        <div className="text-red-600 font-medium">Event not found</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fbf6ee] py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Event Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-200">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-serif font-medium text-stone-800">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 mt-4 text-stone-600">
                <div className="flex items-center gap-1">
                  <Calendar size={18} />
                  <span>
                    {new Date(event.timings.from).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={18} />
                  <span>
                    {new Date(event.timings.from).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-amber-700">
                  <Trophy size={18} />
                  <span>₹{event.prizeMoney.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                event.state === "ONGOING"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100 animate-pulse"
                  : "bg-stone-100 text-stone-700 border-stone-200"
              }`}
            >
              {event.state}
            </span>
          </div>
          <p className="mt-4 text-stone-600">{event.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200">
          <button
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "teams"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
            onClick={() => setActiveTab("teams")}
          >
            Participating Teams
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "leaderboard"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
            onClick={() => setActiveTab("leaderboard")}
          >
            Leaderboard
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === "teams" && (
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-4 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
                <h3 className="font-serif font-medium text-stone-800">
                  Approved Teams (Order of Play)
                </h3>
                <span className="text-sm text-stone-500">
                  {approvedTeams.length} Teams
                </span>
              </div>
              {approvedTeams.length === 0 ? (
                <div className="p-8 text-center text-stone-500">
                  No teams approved yet.
                </div>
              ) : (
                <div className="divide-y">
                  {approvedTeams.map((item) => (
                    <div
                      key={item.registrationId}
                      onClick={() =>
                        navigate(`/events/${id}/teams/${item.team._id}`)
                      }
                      className="p-4 flex items-center justify-between hover:bg-stone-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center font-serif font-bold text-sm">
                          {item.registrationOrder}
                        </div>
                        <div>
                          <p className="font-medium text-stone-800 group-hover:text-amber-700 transition-colors">
                            {item.team.teamName}
                          </p>
                          <p className="text-sm text-stone-500">
                            Captain: {item.captainName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {item.hasPlayed ? (
                          <span className="flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">
                            <Activity size={12} /> Played
                          </span>
                        ) : (
                          <span className="text-xs font-medium bg-stone-100 text-stone-600 px-2 py-1 rounded border border-stone-200">
                            Pending
                          </span>
                        )}
                        <ChevronRight
                          size={16}
                          className="text-stone-400 group-hover:text-amber-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-4 border-b border-stone-200 bg-stone-50">
                <h3 className="font-serif font-medium text-stone-800">
                  Live Standings
                </h3>
              </div>
              {leaderboard.length === 0 ? (
                <div className="p-8 text-center text-stone-500">
                  No performance data yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-stone-50 text-xs text-stone-500 uppercase">
                      <tr>
                        <th className="px-6 py-3">Rank</th>
                        <th className="px-6 py-3">Team</th>
                        <th className="px-6 py-3 text-right">Distance</th>
                        <th className="px-6 py-3 text-right">Time</th>
                        <th className="px-6 py-3 text-right">Rock Weight</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {leaderboard.map((perf, index) => (
                        <tr key={perf._id} className="hover:bg-stone-50">
                          <td className="px-6 py-4">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0
                                  ? "bg-amber-50 text-amber-700 border border-amber-100"
                                  : index === 1
                                  ? "bg-stone-100 text-stone-700 border border-stone-200"
                                  : index === 2
                                  ? "bg-orange-50 text-orange-700 border border-orange-100"
                                  : "bg-stone-50 text-stone-500 border border-stone-100"
                              }`}
                            >
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-stone-800">
                            {perf.team.teamName}
                          </td>
                          <td className="px-6 py-4 text-right font-medium">
                            {perf.distanceCovered} m
                          </td>
                          <td className="px-6 py-4 text-right text-stone-600">
                            {perf.timeTaken} s
                          </td>
                          <td className="px-6 py-4 text-right text-stone-600">
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
    </div>
  );
}

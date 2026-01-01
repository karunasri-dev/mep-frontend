import { ArrowLeft } from "lucide-react";
import TeamHero from "./TeamHero";
import TeamStats from "./TeamStats";
import RecentEvents from "./RecentEvents";
import TeamMembers from "./TeamMembers";
import BullInfo from "./BullInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getTeamByIdApi } from "../../../services/teams/index";

export default function TeamDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await getTeamByIdApi(id);
        setData(res.data.data);
      } catch (e) {
        setErr("Failed to load team details");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const team = useMemo(() => {
    if (!data) return null;
    const firstPair =
      Array.isArray(data.bullPairs) && data.bullPairs.length > 0
        ? data.bullPairs[0]
        : null;
    const bullName =
      firstPair?.bullA?.name || firstPair?.bullB?.name || "N/A";
    const members = Array.isArray(data.teamMembers) ? data.teamMembers.length : 0;
    const totalEvents = data.eventsParticipated || 0;
    const wins = data.wins || 0;
    const winRate =
      totalEvents > 0 ? `${Math.round((wins / totalEvents) * 100)}%` : "—";

    return {
      id: data._id,
      name: data.teamName,
      owner: data.createdBy?.name || "Unknown Owner",
      bullName,
      location: data.location || "—",
      established: data.createdAt ? new Date(data.createdAt).getFullYear() : "—",
      members,
      totalEvents,
      wins,
      podiums: data.podiums || 0,
      image: "🐂",
      description: data.description || "Team description not available.",
      stats: {
        winRate,
        bestTime: data.bestTime || "—",
        totalPrizes: data.totalPrizes || "—",
        currentRank: data.rank || "-",
      },
      recentEvents: Array.isArray(data.recentEvents) ? data.recentEvents : [],
      teamMembers:
        Array.isArray(data.teamMembers)
          ? data.teamMembers.map((m) => ({
              name: m.name || "Unknown",
              role: m.role || "Member",
            }))
          : [],
    };
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
      <button
        onClick={() => navigate("/admin/teams")}
        className="flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Teams
      </button>

      {loading ? (
        <div className="p-12 text-center">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mb-4"></div>
          <p className="text-stone-500 font-medium">Loading team details...</p>
        </div>
      ) : err ? (
        <div className="p-6 bg-stone-50 border border-stone-200 rounded-lg text-stone-700">
          {err}
        </div>
      ) : team ? (
        <>
          <TeamHero team={team} />
          <TeamStats stats={team.stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentEvents events={team.recentEvents} />
            </div>

            <TeamMembers members={team.teamMembers} />
          </div>

          <BullInfo team={team} />
        </>
      ) : null}
    </div>
  );
}

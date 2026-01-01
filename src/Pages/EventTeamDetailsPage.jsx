import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getTeamByIdApi } from "../services/teams/index";

// Reuse Admin Components
import TeamHero from "../admin/components/ActiveTeams/TeamHero";
import TeamStats from "../admin/components/ActiveTeams/TeamStats";
import RecentEvents from "../admin/components/ActiveTeams/RecentEvents";
import TeamMembers from "../admin/components/ActiveTeams/TeamMembers";
import BullInfo from "../admin/components/ActiveTeams/BullInfo";

export default function EventTeamDetailsPage() {
  const { eventId, teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamDetails();
  }, [teamId]);

  const fetchTeamDetails = async () => {
    try {
      setLoading(true);
      const res = await getTeamByIdApi(teamId);
      const teamData = res.data.data;
      
      // Adapt Backend Data to UI Components
      const owner = teamData.teamMembers?.find(m => m.role === "OWNER")?.name || "Unknown";
      const bullNames = teamData.bullPairs?.map(bp => `${bp.bullA.name} & ${bp.bullB.name}`).join(", ") || "No Bulls";
      
      const adaptedTeam = {
        id: teamData._id,
        name: teamData.teamName,
        owner: owner,
        bullName: bullNames,
        location: "Mangalore, Karnataka", // Placeholder as location isn't in Team model
        established: new Date(teamData.createdAt).getFullYear().toString(),
        members: teamData.teamMembers?.length || 0,
        totalEvents: 0, // Placeholder
        wins: 0, // Placeholder
        podiums: 0, // Placeholder
        image: "🐂",
        description: teamData.info || "No description available for this team.",
        stats: {
          winRate: "0%",
          bestTime: "N/A",
          totalPrizes: "₹0",
          currentRank: "N/A",
        },
        recentEvents: [], // Placeholder
        teamMembers: teamData.teamMembers?.map(m => ({
          name: m.name,
          role: m.role
        })) || []
      };

      setTeam(adaptedTeam);
    } catch (err) {
      console.error("Failed to fetch team details", err);
      setError("Failed to load team details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <p className="text-gray-500">Loading team details...</p>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col justify-center items-center gap-4">
        <p className="text-red-500">{error || "Team not found"}</p>
        <button 
          onClick={() => navigate(`/events/${eventId}`)}
          className="text-blue-600 hover:underline"
        >
          Go back to Event
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(`/events/${eventId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Event
        </button>

        <TeamHero team={team} />
        <TeamStats stats={team.stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentEvents events={team.recentEvents} />
          </div>

          <TeamMembers members={team.teamMembers} />
        </div>

        <BullInfo team={team} />
      </div>
    </div>
  );
}

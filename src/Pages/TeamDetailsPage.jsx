import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Users,
  Trophy,
  Calendar,
  Award,
  Medal,
  Star,
} from "lucide-react";
import { getTeamByIdApi } from "../services/teams/index";

export default function TeamDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchTeamDetails();
    }
  }, [id]);

  const fetchTeamDetails = async () => {
    try {
      setLoading(true);
      const res = await getTeamByIdApi(id);
      const teamData = res.data.data;

      // Adapt Backend Data
      const owner =
        teamData.teamMembers?.find((m) => m.role === "OWNER")?.name ||
        "Unknown";

      const adaptedTeam = {
        id: teamData._id,
        name: teamData.teamName,
        owner: owner,
        location: "Mangalore, Karnataka", // Placeholder
        established: new Date(teamData.createdAt).getFullYear().toString(),
        description: teamData.info || "No description available for this team.",
        bullPairs: teamData.bullPairs || [],
        members: teamData.teamMembers || [],
        stats: {
          wins: 0,
          events: 0,
          rank: "N/A",
        },
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
      <div className="min-h-screen bg-[#fbf6ee] flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-amber-200 rounded-full mb-4"></div>
          <p className="text-stone-600 font-serif">Loading team details...</p>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-[#fbf6ee] flex flex-col justify-center items-center gap-4">
        <p className="text-red-600 font-serif text-xl">
          {error || "Team not found"}
        </p>
        <button
          onClick={() => navigate("/teams")}
          className="text-amber-700 hover:text-amber-900 underline underline-offset-4"
        >
          Return to Teams
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf6ee] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation */}
        <Link
          to="/teams"
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Teams
        </Link>

        {/* Hero Section */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Team Avatar/Image Placeholder */}
            <div className="w-32 h-32 bg-stone-100 rounded-2xl flex items-center justify-center text-6xl shadow-inner border border-stone-200">
              🐂
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-4xl font-serif text-stone-800 mb-2">
                  {team.name}
                </h1>
                <div className="flex flex-wrap gap-4 text-stone-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span>Owner: {team.owner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>{team.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>Est. {team.established}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-stone-600 max-w-2xl leading-relaxed">
                {team.description}
              </p>
            </div>

            {/* Quick Stats (Hero) */}
            <div className="flex gap-6 md:border-l border-stone-200 md:pl-8">
              <div className="text-center">
                <div className="text-3xl font-serif text-amber-700">
                  {team.stats.wins}
                </div>
                <div className="text-xs text-stone-500 uppercase tracking-wider">
                  Wins
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-serif text-amber-700">
                  {team.stats.events}
                </div>
                <div className="text-xs text-stone-500 uppercase tracking-wider">
                  Events
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Bulls & Members */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Bulls Section */}
            <section>
              <h2 className="text-2xl font-serif text-stone-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-amber-400 rounded-full"></span>
                Registered Bulls
              </h2>
              
              {team.bullPairs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {team.bullPairs.map((pair, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-stone-200 rounded-xl p-6 hover:border-amber-300 transition-colors shadow-sm"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-xl">
                          🐂
                        </div>
                        <div>
                          <h3 className="font-serif text-lg text-stone-800">
                            {pair?.bullA?.name || "—"} & {pair?.bullB?.name || "—"}
                          </h3>
                          <p className="text-sm text-stone-500">
                            Category: {pair?.category?.type || "—"} / {pair?.category?.value || "—"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-lg">
                        Bull pair details shown from team record
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-stone-200 rounded-xl p-8 text-center text-stone-500 italic">
                  No bulls registered yet.
                </div>
              )}
            </section>

            {/* Team Members Section */}
            <section>
              <h2 className="text-2xl font-serif text-stone-800 mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-amber-400 rounded-full"></span>
                Team Members
              </h2>
              
              <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-stone-50 border-b border-stone-200">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {team.members.map((member, idx) => (
                        <tr key={idx} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4 text-stone-800 font-medium">
                            {member.name}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                member.role === "OWNER"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-stone-100 text-stone-600"
                              }`}
                            >
                              {member.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-stone-500 text-sm">
                            Active
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Achievements & History */}
          <div className="space-y-8">
            {/* Achievements Card */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-stone-800 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-600" />
                Achievements
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-3">
                    <Medal className="w-5 h-5 text-amber-600" />
                    <span className="text-stone-700 font-medium">Rank</span>
                  </div>
                  <span className="text-amber-800 font-bold">#{team.stats.rank}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-100">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-stone-500" />
                    <span className="text-stone-700 font-medium">Total Prize</span>
                  </div>
                  <span className="text-stone-800 font-bold">₹0</span>
                </div>
              </div>
            </div>

            {/* Recent Activity (Placeholder) */}
            <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
              <h3 className="font-serif text-xl text-stone-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-600" />
                Recent Activity
              </h3>
              <p className="text-stone-500 text-sm italic">
                No recent activity recorded.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTeams } from "../context/TeamContext";
import CreateTeam from "../components/CreateTeam";
import { TableSkeleton } from "../components/ShimmerEffect";

const BullsPage = () => {
  const { isLogin } = useAuth();
  const { teams, fetchTeamsOnce, refreshTeams, loading } = useTeams();

  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchTeamsOnce();
    console.log(teams);
  }, [fetchTeamsOnce]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#fbf6ee] py-8">
        <div className="max-w-7xl mx-auto px-4 space-y-6" aria-busy="true">
          <div className="flex justify-between items-center">
            <div className="h-8 w-48 bg-stone-200/60 rounded-md" aria-hidden="true"></div>
          </div>
          <TableSkeleton rows={6} />
        </div>
      </div>
    );

  const getOwnerName = (team) =>
    team?.teamMembers?.find((m) => m.role === "OWNER")?.name || "-";

  const handleTeamCreated = async () => {
    await refreshTeams(); // ✅ sync with backend
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf6ee] py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif font-medium text-stone-800">
            Bull Teams
          </h2>
          {isLogin && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
            >
              + Add Team
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Bulls
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100">
              {teams.map((team) => (
                <>
                  <tr
                    key={team._id}
                    className="hover:bg-stone-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-stone-800">
                      {team.teamName}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {getOwnerName(team)}
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {team.bullPairs?.length ?? 0}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() =>
                          setExpanded(expanded === team._id ? null : team._id)
                        }
                        className="text-amber-700 hover:text-amber-900 font-medium"
                      >
                        {expanded === team._id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>

                  {expanded === team._id && (
                    <tr>
                      <td colSpan={4} className="bg-stone-50 px-6 py-4">
                        {Array.isArray(team.bullPairs) &&
                        team.bullPairs.length > 0 ? (
                          <ul className="space-y-2">
                            {team.bullPairs.map((pair, idx) => (
                              <li
                                key={pair._id || idx}
                                className="text-stone-700"
                              >
                                <span className="font-medium mx-2">
                                  {pair?.bullA?.name ?? "Unknown Bull"}
                                </span>
                                &
                                <span className="font-medium mx-2">
                                  {pair?.bullB?.name ?? "Unknown Bull"}
                                </span>
                                -
                                <span className="font-medium mx-2">
                                  {pair?.category.value}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-stone-500">
                            No bulls registered for this team
                          </p>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm overflow-y-auto">
            <div className="min-h-screen flex items-start justify-center py-10">
              <CreateTeam
                onSubmit={handleTeamCreated}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BullsPage;

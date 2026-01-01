import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTeams } from "../context/TeamContext";
import CreateTeam from "../components/CreateTeam";

const BullsPage = () => {
  const { isLogin } = useAuth();
  const { teams, fetchTeamsOnce, refreshTeams, loading } = useTeams();

  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetchTeamsOnce();
    console.log(teams);
  }, [fetchTeamsOnce]);

  if (loading) return <p>Loading...</p>;

  const getOwnerName = (team) =>
    team?.teamMembers?.find((m) => m.role === "OWNER")?.name || "-";

  const handleTeamCreated = async () => {
    await refreshTeams(); // ✅ sync with backend
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Bull Teams</h2>
        {isLogin && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            + Add Team
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Team</th>
              <th className="px-4 py-3 text-left">Owner</th>
              <th className="px-4 py-3 text-left">Bulls</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {teams.map((team) => (
              <>
                <tr key={team._id}>
                  <td className="px-4 py-3 font-medium">{team.teamName}</td>
                  <td className="px-4 py-3">{getOwnerName(team)}</td>
                  <td className="px-4 py-3">{team.bullPairs?.length ?? 0}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        setExpanded(expanded === team._id ? null : team._id)
                      }
                      className="text-orange-600 font-medium"
                    >
                      {expanded === team._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {expanded === team._id && (
                  <tr>
                    <td colSpan={4} className="bg-gray-50 px-6 py-4">
                      {Array.isArray(team.bullPairs) &&
                      team.bullPairs.length > 0 ? (
                        <ul className="space-y-2">
                          {team.bullPairs.map((pair, idx) => (
                            <li key={pair._id || idx}>
                              <span className="font-medium mx-2">
                                {pair?.bullA?.name ?? "Unknown Bull"}
                              </span>{" "}
                              &{" "}
                              <span className="font-medium mx-2">
                                {pair?.bullB?.name ?? "Unknown Bull"}
                              </span>{" "}
                              -{" "}
                              <span className="font-medium mx-2">
                                {pair?.category.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">
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
        <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center py-10">
            <CreateTeam
              onSubmit={handleTeamCreated}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BullsPage;

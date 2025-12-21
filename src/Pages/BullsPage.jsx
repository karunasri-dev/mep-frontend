import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CreateTeam from "../components/CreateTeam";

const BullsPage = () => {
  const { isLogin } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const [teams, setTeams] = useState([
    {
      id: 1,
      teamName: "Thunder Bulls",
      bulls: [
        {
          name: "Bull A",
          category: { type: "AGE_GROUP", value: "SENIOR" },
        },
        {
          name: "Bull B",
          category: { type: "AGE_GROUP", value: "JUNIOR" },
        },
      ],
      teamMembers: [
        { name: "Rajesh Kumar", role: "OWNER" },
        { name: "Driver 1", role: "DRIVER" },
      ],
    },
    {
      id: 2,
      teamName: "Mighty Warriors",
      bulls: [
        {
          name: "Bull X",
          category: { type: "DENTITION", value: "FOUR" },
        },
      ],
      teamMembers: [{ name: "Suresh Reddy", role: "OWNER" }],
    },
    {
      id: 3,
      teamName: "Power Bulls",
      bulls: [
        {
          name: "Bull C",
          category: { type: "CLASS", value: "GENERAL" },
        },
        {
          name: "Bull D",
          category: { type: "AGE_GROUP", value: "JUNIOR" },
        },
      ],
      teamMembers: [
        { name: "Krishna Murthy", role: "OWNER" },
        { name: "Helper 1", role: "HELPER" },
      ],
    },
  ]);

  /* -------- HELPERS -------- */

  const getOwnerName = (team) =>
    team.teamMembers.find((m) => m.role === "OWNER")?.name || "-";

  const formatCategory = (category) =>
    `${category.type.replace("_", " ")} - ${category.value.replace("_", " ")}`;

  /* -------- ADD TEAM FROM FORM -------- */

  const addTeam = (team) => {
    setTeams((p) => [
      ...p,
      { ...team, id: Date.now() }, // temp id for UI
    ]);
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

      {/* TABLE */}
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
                <tr key={team.id}>
                  <td className="px-4 py-3 font-medium">{team.teamName}</td>
                  <td className="px-4 py-3">{getOwnerName(team)}</td>
                  <td className="px-4 py-3">{team.bulls.length}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        setExpanded(expanded === team.id ? null : team.id)
                      }
                      className="text-orange-600 font-medium cursor-pointer"
                    >
                      {expanded === team.id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {expanded === team.id && (
                  <tr>
                    <td colSpan="4" className="bg-gray-50 px-6 py-4">
                      <ul className="space-y-2">
                        {team.bulls.map((b, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between border rounded-lg px-4 py-2"
                          >
                            <span>{b.name}</span>
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                              {b.category.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <CreateTeam onSubmit={addTeam} onCancel={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default BullsPage;

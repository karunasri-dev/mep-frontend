import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import BullForm from "../components/BullForm";

const BullsPage = () => {
  const { isLogin } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [teams, setTeams] = useState([
    {
      teamName: "Thunder Bulls",
      ownerName: "Rajesh Kumar",
      bulls: [
        { name: "Bull A", category: "senior" },
        { name: "Bull B", category: "junior" },
      ],
      drivers: ["Driver 1", "Driver 2"],
      contact: "9876543210",
      totalMembers: 5,
    },
    {
      teamName: "Mighty Warriors",
      ownerName: "Suresh Reddy",
      bulls: [{ name: "Bull X", category: "senior" }],
      contact: "9123456780",
      totalMembers: 3,
    },
    {
      teamName: "Power Bulls",
      ownerName: "Krishna Murthy",
      bulls: [
        { name: "Bull C", category: "senior" },
        { name: "Bull D", category: "junior" },
        { name: "Bull E", category: "junior" },
      ],
      contact: "8765432109",
      totalMembers: 4,
    },
  ]);

  const addTeam = (team) => {
    setTeams((p) => [...p, team]);
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
            {teams.map((team, i) => (
              <>
                <tr key={i}>
                  <td className="px-4 py-3 font-medium">{team.teamName}</td>
                  <td className="px-4 py-3">{team.ownerName}</td>
                  <td className="px-4 py-3">{team.bulls.length}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setExpanded(expanded === i ? null : i)}
                      className="text-orange-600 font-medium"
                    >
                      {expanded === i ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {expanded === i && (
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
                              {b.category}
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

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <BullForm onSubmit={addTeam} onCancel={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default BullsPage;

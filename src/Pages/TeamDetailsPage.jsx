import { Link, useParams } from "react-router-dom";

const mockTeams = [
  {
    id: "0",
    name: "RK Bulls",
    category: "Senior",
    totalBulls: 10,
    bulls: [
      { name: "Bull 1", type: "Senior" },
      { name: "Bull 2", type: "Senior" },
    ],
  },
  {
    id: "1",
    name: "BSR Bulls",
    category: "Senior",
    totalBulls: 3,
    bulls: [{ name: "Bull A", type: "Senior" }],
  },
];

const TeamDetailsPage = () => {
  const { id } = useParams();
  console.log("teamId:", id);
  const team = mockTeams.find((t) => t.id === id);

  if (!team) {
    return <p className="text-stone-700">Team not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Back */}
      <Link to="/teams" className="text-sm text-amber-700 hover:text-amber-900">
        ← Back to Teams
      </Link>

      {/* Header */}
      <div className="border-b border-amber-200 pb-4">
        <h1 className="text-4xl font-serif text-stone-800">{team.name}</h1>
        <p className="text-stone-600 mt-1">
          Category:{" "}
          <span className="font-medium text-emerald-700">{team.category}</span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <Stat label="Total Bulls" value={team.totalBulls} />
        <Stat label="Category" value={team.category} />
      </div>

      {/* Bulls List */}
      <div>
        <h2 className="text-2xl font-serif text-stone-800 mb-4">
          Bulls Details
        </h2>

        <div className="border border-stone-300 divide-y">
          {team.bulls.map((bull, idx) => (
            <div
              key={idx}
              className="flex justify-between px-4 py-3 bg-[#fbf6ee]"
            >
              <span className="text-stone-800">{bull.name}</span>
              <span className="text-sm text-stone-600">{bull.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="border border-stone-300 bg-[#fbf6ee] p-4">
    <p className="text-sm text-stone-600">{label}</p>
    <p className="text-2xl font-serif text-stone-800">{value}</p>
  </div>
);

export default TeamDetailsPage;

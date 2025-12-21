import { ShimmerCardH } from "../components/ShimmerEffect";
import { Link, useNavigate } from "react-router-dom";

const TeamsPage = ({ loading }) => {
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <ShimmerCardH key={i} />
        ))}
      </div>
    );
  }

  const teams = [
    { name: "RK Bulls", bulls: 10, category: "Senior" },
    { name: "BSR Bulls", bulls: 3, category: "Senior" },
    { name: "PSK & PSC Bulls", bulls: 4, category: "Junior" },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Back Link */}
      <Link
        to="/"
        className="text-sm text-amber-700 hover:text-amber-900 font-medium transition"
      >
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex justify-between items-center border-b border-amber-200 pb-4">
        <h2 className="text-3xl font-serif font-semibold text-stone-800">
          Active Teams
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map((team, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/teams/${idx}`)}
            className="bg-[#fbf6ee] border border-stone-300 p-6 hover:border-amber-600 transition"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-serif text-stone-800 tracking-wide">
                {team.name}
              </h3>

              <div className="h-px bg-amber-300 w-12" />

              <p className="text-sm text-stone-600">
                Category:{" "}
                <span className="font-medium text-emerald-700">
                  {team.category}
                </span>
              </p>

              <p className="text-sm text-stone-600">
                Total Bulls:{" "}
                <span className="font-medium text-stone-800">{team.bulls}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;

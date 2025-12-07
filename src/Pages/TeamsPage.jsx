// Teams Page
import { ShimmerCardH } from "../components/ShimmerEffect";
const TeamsPage = ({ loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <ShimmerCardH key={i} />
        ))}
      </div>
    );
  }

  const teams = [
    {
      name: "RK Bulls",
      bulls: 10,
      category: "Seniors",
      color: "bg-red-500",
      initial: "R",
    },
    {
      name: "BSR Bulls",
      bulls: 3,
      category: "Seniors",
      color: "bg-blue-500",
      initial: "B",
    },
    {
      name: "PSK & PSC Bulls",
      bulls: 4,
      category: "Juniors",
      color: "bg-green-500",
      initial: "P",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Active Teams</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
          + Add Team
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, idx) => (
          <div
            key={idx}
            className={`${
              team.color
            } bg-opacity-10 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow border-2 border-${
              team.color.split("-")[1]
            }-200`}
          >
            <div
              className={`w-20 h-20 ${team.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold shadow-lg`}
            >
              {team.initial}
            </div>
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              {team.name}
            </h3>
            <div className="text-center mb-4">
              <span
                className={`inline-block ${team.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}
              >
                {team.bulls} Bulls
              </span>
            </div>
            <div className="space-y-1 text-center text-gray-700">
              <p className="font-medium">{team.category}</p>
              <p className="text-sm">Category</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;

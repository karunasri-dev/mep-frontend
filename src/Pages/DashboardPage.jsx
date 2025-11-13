// Dashboard Page
import { ShimmerCardH } from "../components/ShimmerEffect";
const DashboardPage = ({ loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ShimmerCardH key={i} />
        ))}
      </div>
    );
  }

  const stats = [
    { label: "Total Bulls", value: "156", color: "bg-blue-500" },
    { label: "Active Teams", value: "24", color: "bg-green-500" },
    { label: "Registered Drivers", value: "89", color: "bg-purple-500" },
    { label: "Upcoming Events", value: "8", color: "bg-orange-500" },
    { label: "Total Owners", value: "134", color: "bg-pink-500" },
    { label: "Championships", value: "12", color: "bg-yellow-500" },
  ];
  ``;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div
              className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <span className="text-2xl text-white font-bold">
                {stat.value}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              {stat.label}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DashboardPage;

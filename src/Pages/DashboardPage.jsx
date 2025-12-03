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
    { label: "Active Owners", value: "156", color: "bg-blue-500" },
    { label: "Active Bulls", value: "24", color: "bg-green-500" },
    { label: "Upcoming Events", value: "8", color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center justify-between bg-green-100 border-2 border-green-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Active Owners
            </h3>
            <p className="text-3xl font-bold text-gray-900 text-center mt-2">
              156
            </p>
          </div>

          <div>
            <div className="w-16 h-16 bg-green-200 border-4 border-green-200 rounded-full flex items-center justify-center mx-auto mb-4 mr-5">
              <span className="text-2xl text-white font-bold">⭐</span>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex items-center justify-between bg-red-100 border-2 border-red-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Active Bulls
            </h3>
            <p className="text-3xl font-bold text-gray-900 text-center mt-2">
              156
            </p>
          </div>

          <div>
            <div className="w-16 h-16 bg-red-200 border-4 border-red-200 rounded-full flex items-center justify-center mx-auto mb-4 mr-5">
              <span className="text-2xl text-white font-bold">⭐</span>
            </div>
          </div>
        </div>{" "}
        <div className="flex items-center justify-between bg-blue-100 border-2 border-blue-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Upcoming Events
            </h3>
            <p className="text-3xl font-bold text-gray-900 text-center mt-2"></p>
          </div>

          <div>
            <div className="w-16 h-16 bg-blue-200 border-4 border-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 mr-5">
              <span className="text-2xl text-white font-bold">⭐</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-amber-100 border-2 border-amber-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Live
            </h3>
            <p className="text-3xl font-bold text-gray-900 text-center mt-2"></p>
          </div>

          <div>
            <div className="w-16 h-16 bg-amber-200 border-4 border-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 mr-5">
              <span className="text-2xl text-white font-bold">⭐</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-violet-100 border-2 border-violet-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              History
            </h3>
            <p className="text-3xl font-bold text-gray-900 text-center mt-2"></p>
          </div>

          <div>
            <div className="w-16 h-16 bg-violet-200 border-4 border-violet-200 rounded-full flex items-center justify-center mx-auto mb-4 mr-5">
              <span className="text-2xl text-white font-bold">⭐</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between bg-teal-100 border-2 border-teal-200 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Contact & Help
            </h3>
            <p className="text-3xl font-bold text-gray-900 text-center mt-2"></p>
          </div>

          <div>
            <div className="w-16 h-16 bg-teal-200 border-4 border-teal-200 rounded-full flex items-center justify-center mx-auto mb-4 mr-5">
              <span className="text-2xl text-white font-bold">⭐</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;

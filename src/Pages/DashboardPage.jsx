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

  return (
    <div className="min-h-screen bg-[#fbf6ee] py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <h2 className="text-2xl font-serif text-stone-800">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-sm text-stone-600">Active Owners</h3>
            <p className="text-3xl font-serif text-stone-900 mt-2">156</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-sm text-stone-600">Active Bulls</h3>
            <p className="text-3xl font-serif text-stone-900 mt-2">24</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-sm text-stone-600">Upcoming Events</h3>
            <p className="text-3xl font-serif text-stone-900 mt-2">8</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-sm text-stone-600">Live</h3>
            <p className="text-3xl font-serif text-stone-900 mt-2">1</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-sm text-stone-600">History</h3>
            <p className="text-3xl font-serif text-stone-900 mt-2">—</p>
          </div>
          <div className="bg-white border border-stone-200 rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-sm text-stone-600">Contact & Help</h3>
            <p className="text-3xl font-serif text-stone-900 mt-2">—</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;

export default function QuickStat({ label, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 mb-1">{label}</p>
          <p className="text-gray-900">{value}</p>
        </div>
        <div
          className={`w-12 h-12 bg-${color}-100 rounded-full flex items-center justify-center`}
        >
          <span className={`text-${color}-600`}>{icon}</span>
        </div>
      </div>
    </div>
  );
}

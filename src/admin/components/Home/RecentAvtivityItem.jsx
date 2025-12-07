export default function RecentActivityItem({ action, team, time, color }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <div className="flex-1">
        <p className="text-gray-900 text-sm">{action}</p>
        <p className="text-gray-600 text-sm">{team}</p>
      </div>
      <span className="text-gray-500 text-sm">{time}</span>
    </div>
  );
}

import { Trophy, Users as UsersIcon, MapPin } from "lucide-react";

export default function TeamCard({ team, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-amber-500 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
    >
      {/* Icon */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-linear-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 transition-transform">
        {team.image}
      </div>

      {/* Wins */}
      {team.wins > 0 && (
        <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
          <Trophy className="w-3 h-3" />
          <span>{team.wins} wins</span>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
          {team.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{team.owner}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-lg">🐂</span>
            <span>{team.bullName}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{team.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UsersIcon className="w-4 h-4" />
            <span>{team.members} members</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Events</span>
            <span className="text-gray-900">{team.eventsParticipated}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-amber-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <span>View Details</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

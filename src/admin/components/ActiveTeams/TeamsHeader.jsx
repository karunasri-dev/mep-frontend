import { ArrowLeft } from "lucide-react";

export default function TeamsHeader({ onBack, activeCount }) {
  return (
    <div className="mb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-gray-900 mb-2">Active Teams</h2>
          <p className="text-gray-600">
            Browse and manage all registered teams
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>{activeCount} Active Teams</span>
        </div>
      </div>
    </div>
  );
}

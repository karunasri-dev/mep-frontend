import { Edit2, Trophy } from "lucide-react";

export default function ChampionCard({ champion, onEdit }) {
  return (
    <div className="border-2 border-amber-200 rounded-lg p-6 bg-linear-to-br from-amber-50 to-white hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>

          <div>
            <h3 className="text-gray-900">{champion.eventName}</h3>
            <p className="text-gray-600 text-sm">
              {new Date(champion.eventDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-white"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Field label="Winner" value={champion.winnerName} />
        <Field label="Bull" value={champion.bullName} />
        <Field label="Time" value={champion.raceTime} />
        <Field label="Prize" value={champion.prizeAmount} />
      </div>

      {champion.notes && (
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-gray-500 text-sm mb-1">Notes</p>
          <p className="text-gray-700">{champion.notes}</p>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  );
}

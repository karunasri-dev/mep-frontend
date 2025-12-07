import { Check, X } from "lucide-react";

export default function UserCard({ user, onApprove, onReject }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-900">{user.name}</p>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <p className="text-gray-600 text-sm">{user.phone}</p>
          </div>

          <div>
            <p className="text-gray-700">
              <span className="text-gray-500">Event:</span> {user.eventName}
            </p>
            <p className="text-gray-700">
              <span className="text-gray-500">Bull:</span> {user.bullName}
            </p>
            <p className="text-gray-600 text-sm">
              Registered: {new Date(user.registrationDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.status === "pending" ? (
            <>
              <button
                onClick={() => onApprove(user.id)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Check className="w-4 h-4" />
                Approve
              </button>

              <button
                onClick={() => onReject(user.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
            </>
          ) : (
            <span
              className={`px-4 py-2 rounded-lg ${
                user.status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

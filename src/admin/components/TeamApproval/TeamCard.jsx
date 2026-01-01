import { Check, X, Calendar, Phone, Mail } from "lucide-react";

export default function TeamCard({ user, onApprove, onReject }) {
  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6 hover:border-amber-400 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xl font-serif text-stone-800 font-medium">
              {user.name}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-sm text-stone-600">
                <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{user.email || "No email"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-600">
                <div className="w-8 h-8 rounded-lg bg-stone-50 flex items-center justify-center text-stone-400">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{user.phone || "No phone"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-stone-700">
              <span className="text-stone-500 text-xs font-medium uppercase tracking-wide w-12">
                Event
              </span>
              <span className="font-medium text-sm">{user.eventName}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <span className="text-stone-500 text-xs font-medium uppercase tracking-wide w-12">
                Bull
              </span>
              <span className="font-medium text-sm">{user.bullName}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500 text-sm mt-2 pt-2 border-t border-stone-100">
              <Calendar className="w-4 h-4" />
              <span>
                Registered:{" "}
                {new Date(user.registrationDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100">
          {user.status === "pending" ? (
            <>
              <button
                onClick={() => onApprove(user.id)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm font-medium text-sm"
              >
                <Check className="w-4 h-4" />
                Approve
              </button>

              <button
                onClick={() => onReject(user.id)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
              >
                <X className="w-4 h-4" />
                Reject
              </button>
            </>
          ) : (
            <span
              className={`px-4 py-2 rounded-lg font-medium text-sm border ${
                user.status === "approved"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-red-50 text-red-700 border-red-100"
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

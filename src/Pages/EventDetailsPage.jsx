import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import {
  getEventDaysPublic,
  getEventDaysAdmin,
  createEventDay,
  updateEventDayStatus,
  addBullPairsToDay,
  getDayBullPairsPublic,
  updateDayBullPairStatus,
  updateDayBullPairPerformance,
  setDayBullPairWinner,
} from "../services/events/performance.api";
import { getEventById } from "../services/events/event.api";
import {
  Trophy,
  Clock,
  MapPin,
  Calendar,
  Activity,
  ArrowLeft,
} from "lucide-react";

export default function EventDetailsPage() {
  const routeParams = useParams();
  const eventId = routeParams.id || routeParams.eventId;
  console.log("Event Id", eventId);
  const [event, setEvent] = useState(null);
  const [days, setDays] = useState([]);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const [dayEntries, setDayEntries] = useState([]);
  const selectedDay = days.find((d) => d._id === selectedDayId) || null;
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("days"); // 'days'
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    loadData();
  }, [eventId, isAdminRoute]);

  const loadData = async () => {
    setLoading(true);

    try {
      const eventPromise = getEventById(eventId);
      const daysPromise = isAdminRoute
        ? getEventDaysAdmin(eventId)
        : getEventDaysPublic(eventId);
      const [eventRes, daysRes] = await Promise.all([
        eventPromise,
        daysPromise,
      ]);
      setEvent(eventRes.data.data);
      const d = daysRes.data.data || [];
      setDays(d);
      setSelectedDayId(d.length > 0 ? d[0]._id : null);
      setErrorMsg("");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load event details";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#fbf6ee] flex justify-center items-center">
        <div className="bg-white rounded-xl p-12 text-center border border-stone-200 shadow-sm">
          <div className="inline-block animate-spin w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full mb-4"></div>
          <p className="text-stone-500 font-medium">Loading event details...</p>
        </div>
      </div>
    );
  if (!event)
    return (
      <div className="min-h-screen bg-[#fbf6ee] flex justify-center items-center">
        <div className="text-red-600 font-medium">Event not found</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fbf6ee] py-8">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </Link>
        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3">
            {errorMsg}
          </div>
        )}
        {/* Event Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-stone-200">
          <div className="flex justify-between items-start relative">
            <div className="mt-6 sm:mt-0">
              <h1 className="text-3xl font-serif font-medium text-stone-800">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-4 mt-4 text-stone-600">
                <div className="flex items-center gap-1">
                  <Calendar size={18} />
                  <span>
                    {new Date(event.timings.from).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={18} />
                  <span>
                    {new Date(event.timings.from).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  <span className="text-stone-600 mr-3">
                    {event.location?.name}
                  </span>
                  {event.location?.googleMapUrl && (
                    <a
                      href={event.location.googleMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 hover:underline text-sm whitespace-nowrap"
                    >
                      View on Google Maps
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-1 font-medium text-amber-700">
                  <Trophy size={18} />
                  <span>₹{event.prizeMoney.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <span
              className={`absolute top-[-7px] right-[-7px] sm:relative px-3 py-1 rounded-full text-sm font-semibold border ${
                event.state === "ONGOING"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100 animate-pulse"
                  : "bg-stone-100 text-stone-700 border-stone-200"
              }`}
            >
              {event.state}
            </span>
          </div>
          <p className="mt-4 text-stone-600">{event.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200">
          <button
            className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === "days"
                ? "border-amber-600 text-amber-700"
                : "border-transparent text-stone-500 hover:text-stone-700"
            }`}
            onClick={() => setActiveTab("days")}
          >
            Event Days
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === "days" && (
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
              <div className="p-4 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
                <h3 className="font-serif font-medium text-stone-800">
                  Day-wise BullPair Gameplay
                </h3>
                <span className="text-sm text-stone-500">
                  {days.length} Days
                </span>
              </div>
              {days.length === 0 ? (
                <div className="p-4">
                  <div className="p-8 text-center text-stone-500">
                    No event days yet.
                  </div>
                  {isAdminRoute && (
                    <CreateDayForm
                      eventId={eventId}
                      onCreated={(day) => {
                        setDays((prev) => [...prev, day]);
                        setSelectedDayId(day._id);
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="p-4">
                  <DayList
                    days={days}
                    selectedDayId={selectedDayId}
                    onSelect={(dId) => {
                      setSelectedDayId(dId);
                      if (dId) {
                        getDayBullPairsPublic(dId).then((res) =>
                          setDayEntries(res.data.data || [])
                        );
                      } else {
                        setDayEntries([]);
                      }
                    }}
                    isAdmin={isAdminRoute}
                    onStatusChange={async (dayId, status) => {
                      const res = await updateEventDayStatus(dayId, status);
                      setDays((prev) =>
                        prev.map((d) => (d._id === dayId ? res.data.data : d))
                      );
                    }}
                  />
                  {isAdminRoute && (
                    <CreateDayForm
                      eventId={eventId}
                      onCreated={(day) => {
                        setDays((prev) => [...prev, day]);
                        setSelectedDayId(day._id);
                      }}
                    />
                  )}
                  {selectedDayId && (
                    <DayBullPairsSection
                      eventId={eventId}
                      dayId={selectedDayId}
                      dayStatus={selectedDay?.status}
                      entries={dayEntries}
                      setEntries={setDayEntries}
                      isAdmin={isAdminRoute}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminControls({ entry, onUpdated, dayStatus }) {
  const [perf, setPerf] = useState({
    rockWeightKg: entry.performance?.rockWeightKg || "",
    distanceMeters: entry.performance?.distanceMeters || "",
    timeSeconds: entry.performance?.timeSeconds || "",
  });
  const [timeUnit, setTimeUnit] = useState("minutes"); // minutes or seconds
  const [editing, setEditing] = useState(false);

  const startPlaying = async () => {
    try {
      const res = await updateDayBullPairStatus(entry._id, "PLAYING");
      onUpdated(res.data.data);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to start gameplay";
      setPerf((p) => p);
      import("react-hot-toast").then(({ toast }) => toast.error(msg));
    }
  };
  const complete = async () => {
    try {
      const hasAny =
        perf.rockWeightKg !== "" ||
        perf.distanceMeters !== "" ||
        perf.timeSeconds !== "";
      if (hasAny) {
        const seconds =
          timeUnit === "minutes"
            ? Number(perf.timeSeconds) * 60
            : Number(perf.timeSeconds);
        await updateDayBullPairPerformance(entry._id, {
          rockWeightKg: Number(perf.rockWeightKg),
          distanceMeters: Number(perf.distanceMeters),
          timeSeconds: seconds,
        });
      }
      const resStatus = await updateDayBullPairStatus(entry._id, "COMPLETED");
      onUpdated(resStatus.data.data);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to complete gameplay";
      import("react-hot-toast").then(({ toast }) => toast.error(msg));
    }
  };
  const savePerformance = async () => {
    try {
      const seconds =
        timeUnit === "minutes"
          ? Number(perf.timeSeconds) * 60
          : Number(perf.timeSeconds);
      const res = await updateDayBullPairPerformance(entry._id, {
        rockWeightKg: Number(perf.rockWeightKg),
        distanceMeters: Number(perf.distanceMeters),
        timeSeconds: seconds,
      });
      onUpdated(res.data.data);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save performance";
      import("react-hot-toast").then(({ toast }) => toast.error(msg));
    }
  };

  return (
    <div className="flex flex-col items-end gap-2 w-full md:w-auto">
      {entry.gameStatus === "NEXT" && (
        <button
          onClick={startPlaying}
          className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs hover:bg-amber-700"
        >
          Start
        </button>
      )}
      {entry.gameStatus === "PLAYING" && (
        <div className="flex flex-col gap-2 w-full md:w-80">
          <div className="grid grid-cols-3 gap-2">
            <input
              type="number"
              min="0"
              className="p-2 border border-stone-200 rounded-lg text-xs"
              placeholder="Rock kg"
              value={perf.rockWeightKg}
              onChange={(e) =>
                setPerf({ ...perf, rockWeightKg: e.target.value })
              }
            />
            <input
              type="number"
              min="0"
              className="p-2 border border-stone-200 rounded-lg text-xs"
              placeholder="Distance m"
              value={perf.distanceMeters}
              onChange={(e) =>
                setPerf({ ...perf, distanceMeters: e.target.value })
              }
            />
            <input
              type="number"
              min="0"
              className="p-2 border border-stone-200 rounded-lg text-xs"
              placeholder={timeUnit === "minutes" ? "Time min" : "Time s"}
              value={perf.timeSeconds}
              onChange={(e) =>
                setPerf({ ...perf, timeSeconds: e.target.value })
              }
            />
          </div>
          <div className="text-xs text-stone-600">
            <label className="mr-2">Time unit:</label>
            <select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              className="border border-stone-200 rounded px-2 py-1"
            >
              <option value="minutes">Minutes</option>
              <option value="seconds">Seconds</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={savePerformance}
              className="px-3 py-1 bg-stone-800 text-white rounded-lg text-xs hover:bg-stone-900"
            >
              Save Performance
            </button>
            <button
              onClick={complete}
              className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs hover:bg-emerald-700"
            >
              Complete
            </button>
          </div>
        </div>
      )}
      {entry.gameStatus === "COMPLETED" && entry.playedAt && (
        <div className="text-xs text-stone-500">
          Played at {new Date(entry.playedAt).toLocaleString()}
        </div>
      )}
      {entry.gameStatus === "COMPLETED" &&
        !entry.isWinner &&
        dayStatus !== "COMPLETED" && (
          <>
            {!editing ? (
              <button
                onClick={() => {
                  setEditing(true);
                  setPerf({
                    rockWeightKg: entry.performance?.rockWeightKg ?? "",
                    distanceMeters: entry.performance?.distanceMeters ?? "",
                    timeSeconds:
                      timeUnit === "minutes"
                        ? (entry.performance?.timeSeconds ?? 0) / 60
                        : entry.performance?.timeSeconds ?? "",
                  });
                }}
                className="px-3 py-1 bg-stone-800 text-white rounded-lg text-xs hover:bg-stone-900"
              >
                Edit Score
              </button>
            ) : (
              <div className="flex flex-col gap-2 w-full md:w-80">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    min="0"
                    className="p-2 border border-stone-200 rounded-lg text-xs"
                    placeholder="Rock kg"
                    value={perf.rockWeightKg}
                    onChange={(e) =>
                      setPerf({ ...perf, rockWeightKg: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    className="p-2 border border-stone-200 rounded-lg text-xs"
                    placeholder="Distance m"
                    value={perf.distanceMeters}
                    onChange={(e) =>
                      setPerf({ ...perf, distanceMeters: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    min="0"
                    className="p-2 border border-stone-200 rounded-lg text-xs"
                    placeholder={timeUnit === "minutes" ? "Time min" : "Time s"}
                    value={perf.timeSeconds}
                    onChange={(e) =>
                      setPerf({ ...perf, timeSeconds: e.target.value })
                    }
                  />
                </div>
                <div className="text-xs text-stone-600">
                  <label className="mr-2">Time unit:</label>
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="border border-stone-200 rounded px-2 py-1"
                  >
                    <option value="minutes">Minutes</option>
                    <option value="seconds">Seconds</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={async () => {
                      const confirmed = window.confirm("Save edited score?");
                      if (!confirmed) return;
                      try {
                        const seconds =
                          timeUnit === "minutes"
                            ? Number(perf.timeSeconds) * 60
                            : Number(perf.timeSeconds);
                        const res = await updateDayBullPairPerformance(
                          entry._id,
                          {
                            rockWeightKg: Number(perf.rockWeightKg),
                            distanceMeters: Number(perf.distanceMeters),
                            timeSeconds: seconds,
                          }
                        );
                        onUpdated(res.data.data);
                        setEditing(false);
                      } catch (err) {
                        const msg =
                          err?.response?.data?.message ||
                          err?.message ||
                          "Failed to save changes";
                        import("react-hot-toast").then(({ toast }) =>
                          toast.error(msg)
                        );
                      }
                    }}
                    className="px-3 py-1 bg-stone-800 text-white rounded-lg text-xs hover:bg-stone-900"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-3 py-1 bg-stone-100 text-stone-700 rounded-lg text-xs hover:bg-stone-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      {entry.gameStatus === "COMPLETED" && (
        <button
          onClick={async () => {
            try {
              const res = await setDayBullPairWinner(entry._id);
              onUpdated(res.data.data);
            } catch (err) {
              const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to mark winner";
              import("react-hot-toast").then(({ toast }) => toast.error(msg));
            }
          }}
          className={`px-3 py-1 rounded-lg text-xs ${
            entry.isWinner
              ? "bg-emerald-700 text-white"
              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
          }`}
        >
          {entry.isWinner ? "Winner" : "Mark Winner"}
        </button>
      )}
    </div>
  );
}

function DayList({ days, selectedDayId, onSelect, isAdmin, onStatusChange }) {
  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-4">
      <div className="flex flex-wrap gap-2">
        {days.map((d) => (
          <button
            key={d._id}
            onClick={() => onSelect(d._id)}
            className={`px-3 py-2 rounded-lg text-sm border ${
              selectedDayId === d._id
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : "bg-white border-stone-200 text-stone-700"
            }`}
          >
            {d.date} • ₹{(d.prizeMoney || 0).toLocaleString()} • {d.status}
          </button>
        ))}
      </div>
      {isAdmin && selectedDayId && (
        <div className="mt-3 flex gap-2">
          <select
            onChange={async (e) => {
              try {
                await onStatusChange(selectedDayId, e.target.value);
              } catch (err) {
                const msg =
                  err?.response?.data?.message ||
                  err?.message ||
                  "Failed to change day status";
                import("react-hot-toast").then(({ toast }) => toast.error(msg));
              }
            }}
            defaultValue=""
            className="px-3 py-2 rounded-lg border border-stone-200 text-sm"
          >
            <option value="" disabled>
              Change day status...
            </option>
            <option value="ONGOING">Mark as ONGOING</option>
            <option value="COMPLETED">Mark as COMPLETED</option>
          </select>
        </div>
      )}
    </div>
  );
}

function CreateDayForm({ eventId, onCreated }) {
  const [date, setDate] = useState("");
  const [prize, setPrize] = useState("");
  return (
    <div className="border border-stone-200 rounded-lg p-4 mb-4">
      <div className="flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs text-stone-500 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-stone-200 rounded-lg text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-stone-500 mb-1">
            Prize Money (₹)
          </label>
          <input
            type="number"
            value={prize}
            onChange={(e) => setPrize(e.target.value)}
            className="p-2 border border-stone-200 rounded-lg text-sm"
          />
        </div>
        <button
          onClick={async () => {
            const res = await createEventDay(eventId, {
              date,
              prizeMoney: Number(prize),
            });
            onCreated(res.data.data);
            setDate("");
            setPrize("");
          }}
          className="px-3 py-2 bg-amber-600 text-white rounded-lg text-sm"
        >
          Create Day
        </button>
      </div>
    </div>
  );
}

function DayBullPairsSection({
  eventId,
  dayId,
  dayStatus,
  entries,
  setEntries,
  isAdmin,
}) {
  const [adding, setAdding] = useState(false);
  const [approvedTeams, setApprovedTeams] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      import("../services/events/performance.api").then(async (mod) => {
        const { getApprovedTeams } = mod;
        const res = await getApprovedTeams(eventId);
        setApprovedTeams(res.data.data || []);
      });
    }
  }, [eventId, isAdmin]);

  return (
    <div className="mt-4">
      <div className="p-4 border-b border-stone-200 bg-stone-50 flex justify-between items-center">
        <h3 className="font-serif font-medium text-stone-800">BullPairs</h3>
        {isAdmin && (
          <button
            onClick={() => setAdding((v) => !v)}
            className="px-3 py-2 bg-stone-800 text-white rounded-lg text-sm"
            disabled={dayStatus === "COMPLETED"}
          >
            {dayStatus === "COMPLETED"
              ? "Day Completed"
              : adding
              ? "Close Selection"
              : "Add BullPairs"}
          </button>
          // <button
          //   onClick={() => setAdding((v) => !v)}
          //   className="px-3 py-2 bg-stone-800 text-white rounded-lg text-sm"
          //   disabled={dayStatus !== "UPCOMING"}
          // >
          //   {dayStatus !== "UPCOMING"
          //     ? "Selection Locked"
          //     : adding
          //     ? "Close Selection"
          //     : "Add BullPairs"}
          // </button>
        )}
      </div>

      {adding && isAdmin && (
        <div className="p-4 border border-stone-200 rounded-lg mt-3">
          <p className="text-sm text-stone-600 mb-2">
            Select bullPairs from approved registrations
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {approvedTeams.map((item) => (
              <div key={item.registrationId} className="border-b pb-2">
                <div className="font-medium text-stone-800">
                  {item.team.teamName}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(item.team.bullPairs || [])
                    .filter((bp) =>
                      (item.selectedBullPairs || []).includes(
                        bp._id?.toString()
                      )
                    )
                    .map((bp) => (
                      <label
                        key={bp._id}
                        className="flex items-center gap-2 px-2 py-1 border border-stone-200 rounded-lg text-sm"
                      >
                        <input
                          type="checkbox"
                          value={bp._id}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const key = `${item.registrationId}:${item.team._id}:${bp._id}`;
                            setSelected((prev) =>
                              checked
                                ? [...prev, key]
                                : prev.filter((k) => k !== key)
                            );
                          }}
                        />
                        <span>
                          {bp.bullA?.name} & {bp.bullB?.name} •{" "}
                          {bp.category?.type}/{bp.category?.value}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={async () => {
              try {
                const entriesPayload = selected.map((k) => {
                  const [registrationId, teamId, bullPairId] = k.split(":");
                  return { registrationId, teamId, bullPairId };
                });
                const res = await addBullPairsToDay(dayId, entriesPayload);
                setEntries(res.data.data || []);
                setAdding(false);
                setSelected([]);
              } catch (err) {
                const msg =
                  err?.response?.data?.message ||
                  err?.message ||
                  "Failed to add bullPairs";
                import("react-hot-toast").then(({ toast }) => toast.error(msg));
              }
            }}
            className="mt-3 px-3 py-2 bg-amber-600 text-white rounded-lg text-sm"
          >
            Add Selected
          </button>
        </div>
      )}

      <div className="divide-y mt-3">
        {entries.length === 0 ? (
          <div className="p-8 text-center text-stone-500">
            No bullPairs added for this day.
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry._id}
              className="p-4 flex items-start justify-between hover:bg-stone-50 transition-colors group"
            >
              <div>
                <p className="font-medium text-stone-800 group-hover:text-amber-700 transition-colors">
                  {entry.team?.teamName || "Team"}
                </p>
                <p className="text-xs text-stone-500">
                  {entry.bullPair?.category?.value}
                </p>
                <p className="text-sm text-stone-600">
                  {entry.bullPair?.name || "Bull Pair"}
                </p>

                {entry.isWinner && (
                  <p className="mt-1 text-xs font-semibold text-emerald-700">
                    Winner of the Day
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  {entry.gameStatus === "COMPLETED" ? (
                    <span className="flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded border border-emerald-100">
                      <Activity size={12} /> Completed
                    </span>
                  ) : entry.gameStatus === "PLAYING" ? (
                    <span className="flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100">
                      <Activity size={12} /> Playing
                    </span>
                  ) : (
                    <span className="text-xs font-medium bg-stone-100 text-stone-600 px-2 py-1 rounded border border-stone-200">
                      Next
                    </span>
                  )}
                </div>
                {entry.performance && entry.gameStatus !== "NEXT" && (
                  <div className="text-xs text-stone-600 flex md:flex-wrap flex-col">
                    <span className="mr-2">
                      Distance: {entry.performance.distanceMeters}m
                    </span>
                    <span className="mr-2">
                      Time: {entry.performance.timeSeconds}s
                    </span>
                    <span>Rock: {entry.performance.rockWeightKg} kg</span>
                  </div>
                )}
                {isAdmin && (
                  <AdminControls
                    entry={entry}
                    onUpdated={(updated) =>
                      setEntries((prev) =>
                        prev.map((e) => (e._id === updated._id ? updated : e))
                      )
                    }
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

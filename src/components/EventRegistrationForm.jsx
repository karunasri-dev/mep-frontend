import { useEffect, useState, useRef, useCallback } from "react";
import { X, GripHorizontal } from "lucide-react";

export default function EventRegistrationForm({
  event,
  team,
  bullPairs = [],
  teamMembers = [],
  onSubmit,
  onClose,
}) {
  // Local state

  const [captainName, setCaptainName] = useState("");
  const [selectedBullPairs, setSelectedBullPairs] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Draggable (desktop only)

  const modalRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  if (!event || !team) return null;

  console.log("teamMembers", teamMembers);
  const owner = team?.teamMembers?.find((m) => m.role === "OWNER");

  // Helpers

  const toggleSelection = useCallback((id, setState) => {
    setState((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  // Drag handlers

  const handleDragStart = (e) => {
    if ("ontouchstart" in window) return; // no drag on mobile

    setDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (e) => {
      const modal = modalRef.current;
      if (!modal) return;

      const rect = modal.getBoundingClientRect();
      const nextX = e.clientX - dragStart.current.x;
      const nextY = e.clientY - dragStart.current.y;

      // Clamp inside viewport
      const clampedX = Math.min(
        Math.max(nextX, -rect.left),
        window.innerWidth - rect.right
      );
      const clampedY = Math.min(
        Math.max(nextY, -rect.top),
        window.innerHeight - rect.bottom
      );

      setPosition({ x: clampedX, y: clampedY });
    };

    const handleUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, position]);

  // Escape key

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!captainName.trim()) return setError("Captain name is required");

    if (!selectedBullPairs.length)
      return setError("Select at least one bull pair");

    if (!selectedMembers.length)
      return setError("Select at least one team member");

    try {
      setSubmitting(true);

      await onSubmit({
        captainName: captainName.trim(),
        bullPairs: selectedBullPairs, // UI IDs
        teamMembers: selectedMembers, // UI IDs
      });

      onClose();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Render

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-xl rounded-xl shadow-xl border border-stone-200"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50 cursor-move select-none"
          onMouseDown={handleDragStart}
        >
          <div className="flex items-center gap-2">
            <GripHorizontal size={18} className="text-stone-400" />
            <h3 className="font-serif font-medium text-stone-800">Register for {event.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-stone-100 text-stone-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-stone-50 p-3 rounded-lg text-sm border border-stone-200">
            <b>Team:</b> {team.teamName}
            <br />
            <b>Owner:</b> {owner?.name || "—"}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-stone-700">
              Captain Name
            </label>
            <input
              className="input w-full"
              value={captainName}
              onChange={(e) => setCaptainName(e.target.value)}
              placeholder="Enter captain name"
            />
          </div>

          <div>
            <p className="font-medium text-sm mb-1 text-stone-700">Bull Pairs</p>
            <div className="max-h-[120px] overflow-y-auto border border-stone-200 rounded-lg p-2 space-y-2">
              {bullPairs.map((b) => (
                <div key={b._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBullPairs.includes(b._id)}
                    onChange={() =>
                      toggleSelection(b._id, setSelectedBullPairs)
                    }
                  />
                  <span className="text-sm text-stone-700">
                    {b.bullA.name} & {b.bullB.name} — {b.category.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium text-sm mb-1 text-stone-700">Team Members</p>
            <div className="max-h-[120px] overflow-y-auto border border-stone-200 rounded-lg p-2 space-y-2">
              {teamMembers.map((m) => (
                <div key={m._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(m._id)}
                    onChange={() => toggleSelection(m._id, setSelectedMembers)}
                  />
                  <span className="text-sm text-stone-700">
                    {m.name} — {m.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
            <button type="button" onClick={onClose} disabled={submitting} className="px-4 py-2 rounded-lg text-stone-600 hover:bg-stone-50">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 shadow-sm">
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

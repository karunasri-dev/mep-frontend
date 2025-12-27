import { useRef, useState } from "react";
import { createTeamAPI } from "../services/teams/index";
import { useTeams } from "../context/TeamContext";

const CATEGORY_MAP = {
  milk_teeth: { type: "DENTITION", value: "MILK" },
  two_teeth: { type: "DENTITION", value: "TWO" },
  four_teeth: { type: "DENTITION", value: "FOUR" },
  six_teeth: { type: "DENTITION", value: "SIX" },

  sub_junior: { type: "AGE_GROUP", value: "SUB_JUNIOR" },
  junior: { type: "AGE_GROUP", value: "JUNIOR" },
  senior: { type: "AGE_GROUP", value: "SENIOR" },

  general: { type: "CLASS", value: "GENERAL" },
  new: { type: "CLASS", value: "NEW" },
  old: { type: "CLASS", value: "OLD" },
};

const CreateTeam = ({ onSubmit, onCancel }) => {
  const { refreshTeams } = useTeams();
  const [form, setForm] = useState({
    teamName: "",
    ownerName: "",
    bullPairs: [{ bullA: "", bullB: "", categoryKey: "senior" }],
    teamMembers: [{ name: "", role: "DRIVER", info: "" }], // additional members (non-owner)
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bullBRefs = useRef([]);

  /* ---------------- BASIC HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ---------------- BULL HANDLERS ---------------- */

  const handleBullPairChange = (i, field, value) => {
    const bullPairs = [...form.bullPairs];
    bullPairs[i][field] = value;
    setForm((p) => ({ ...p, bullPairs }));
  };

  const addBullPair = () => {
    setForm((p) => ({
      ...p,
      bullPairs: [
        ...p.bullPairs,
        { bullA: "", bullB: "", categoryKey: "senior" },
      ],
    }));
  };
  const removeBullPair = (i) => {
    setForm((p) => ({
      ...p,
      bullPairs: p.bullPairs.filter((_, idx) => idx !== i),
    }));
  };

  /* ---------------- TEAM MEMBER HANDLERS ---------------- */

  const addMember = () => {
    setForm((p) => ({
      ...p,
      teamMembers: [...p.teamMembers, { name: "", role: "DRIVER", info: "" }],
    }));
  };

  const updateMember = (i, field, value) => {
    const teamMembers = [...form.teamMembers];
    teamMembers[i][field] = value;
    setForm((p) => ({ ...p, teamMembers }));
  };

  const removeMember = (i) => {
    setForm((p) => ({
      ...p,
      teamMembers: p.teamMembers.filter((_, idx) => idx !== i),
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const validateForm = () => {
    if (!form.teamName.trim()) {
      return "Team name is required";
    }

    if (!form.ownerName.trim()) {
      return "Owner name is required";
    }

    if (!form.bullPairs.length) {
      return "At least one bull pair is required";
    }

    for (const pair of form.bullPairs) {
      if (!pair.bullA.trim() || !pair.bullB.trim()) {
        return "Each bull pair must have two bull names";
      }

      if (pair.bullA.trim() === pair.bullB.trim()) {
        return "Bull pair cannot have the same bull twice";
      }

      if (!CATEGORY_MAP[pair.categoryKey]) {
        return "Invalid category selected";
      }
      const category = CATEGORY_MAP[pair.categoryKey];
      if (!category || !category.type || !category.value) {
        return "Each bull pair must have a valid category";
      }
    }

    return null; // valid
  };

  const isFormValid = !validateForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return; // STOP SUBMISSION
    }

    const payload = {
      teamName: form.teamName.trim(),

      bullPairs: form.bullPairs.map((p) => ({
        bullA: { name: p.bullA.trim() },
        bullB: { name: p.bullB.trim() },
        category: {
          type: CATEGORY_MAP[p.categoryKey]?.type,
          value: CATEGORY_MAP[p.categoryKey]?.value,
        },
      })),

      teamMembers: [
        // OWNER (always exactly one)
        {
          name: form.ownerName.trim(),
          role: "OWNER",
        },

        // Other members
        ...form.teamMembers
          .filter((m) => m.name.trim())
          .map((m) => ({
            name: m.name.trim(),
            role: m.role,
            info: m.info.trim(),
          })),
      ],
    };

    setLoading(true);
    setError("");
    try {
      console.log("FINAL PAYLOAD", JSON.stringify(payload, null, 2));

      const result = await createTeamAPI(payload);
      await refreshTeams();
      onSubmit?.(result);
      // On success, perhaps reset form or call onSubmit
      setForm({
        teamName: "",
        ownerName: "",
        bullPairs: [{ bullA: "", bullB: "", categoryKey: "senior" }],
        teamMembers: [{ name: "", role: "DRIVER", info: "" }],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 ">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Add Your Team</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Team + Owner */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="teamName"
            placeholder="Team Name"
            value={form.teamName}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <input
            name="ownerName"
            placeholder="Owner Name"
            value={form.ownerName}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Bull Pairs */}
        <div className="space-y-3">
          <p className="font-semibold text-gray-700 text-sm">
            Bull Pairs ({form.bullPairs.length})
          </p>

          {form.bullPairs.map((pair, i) => (
            <div key={i} className="space-y-2 border rounded-lg p-3">
              {/* Category */}
              <select
                value={pair.categoryKey}
                onChange={(e) =>
                  handleBullPairChange(i, "categoryKey", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="milk_teeth">Milk Teeth</option>
                <option value="two_teeth">Two Teeth</option>
                <option value="four_teeth">Four Teeth</option>
                <option value="six_teeth">Six Teeth</option>

                <option value="sub_junior">Sub Junior</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>

                <option value="general">General</option>
                <option value="new">New</option>
                <option value="old">Old</option>
              </select>

              {/* Bulls + Remove */}
              <div className="flex items-center gap-3">
                {/* Bull 1 */}
                <input
                  placeholder="Bull 1 Name"
                  value={pair.bullA}
                  onChange={(e) =>
                    handleBullPairChange(i, "bullA", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      bullBRefs.current[i]?.focus();
                    }
                  }}
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />

                {/* Bull 2 */}
                <input
                  ref={(el) => (bullBRefs.current[i] = el)}
                  placeholder="Bull 2 Name"
                  value={pair.bullB}
                  onChange={(e) =>
                    handleBullPairChange(i, "bullB", e.target.value)
                  }
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeBullPair(i)}
                  className="text-red-500 text-lg px-2 hover:text-red-700"
                  title="Remove bull pair"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addBullPair}
            className="text-sm text-orange-600 font-medium"
          >
            + Add Bull Pair
          </button>
        </div>

        {/* Team Members */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-700 text-sm">
            Team Members (excluding owner)
          </p>

          {form.teamMembers.map((m, i) => (
            <div key={i} className="flex gap-3">
              <input
                placeholder="Member Name"
                value={m.name}
                onChange={(e) => updateMember(i, "name", e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />

              <select
                value={m.role}
                onChange={(e) => updateMember(i, "role", e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="DRIVER">Driver</option>
                <option value="TRAINER">Trainer</option>
                <option value="CAPTAIN">Captain</option>
                <option value="HELPER">Helper</option>
              </select>
              <input
                placeholder="Info (optional)"
                value={m.info}
                onChange={(e) => updateMember(i, "info", e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              />

              <button
                type="button"
                onClick={() => removeMember(i)}
                className="text-red-500 text-sm"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="text-sm text-orange-600 font-medium"
          >
            + Add Member
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="px-5 py-2 rounded-lg bg-orange-600 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Team"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;

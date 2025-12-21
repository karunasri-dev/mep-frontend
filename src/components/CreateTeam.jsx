import { useState } from "react";

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
  const [form, setForm] = useState({
    teamName: "",
    ownerName: "",
    bulls: [{ name: "", categoryKey: "senior" }],
    members: [{ name: "", role: "DRIVER", info: "" }], // additional members (non-owner)
  });

  /* ---------------- BASIC HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ---------------- BULL HANDLERS ---------------- */

  const handleBullChange = (i, field, value) => {
    const bulls = [...form.bulls];
    bulls[i][field] = value;
    setForm((p) => ({ ...p, bulls }));
  };

  const addBull = () => {
    setForm((p) => ({
      ...p,
      bulls: [...p.bulls, { name: "", categoryKey: p.bulls[0].categoryKey }],
    }));
  };

  /* ---------------- TEAM MEMBER HANDLERS ---------------- */

  const addMember = () => {
    setForm((p) => ({
      ...p,
      members: [...p.members, { name: "", role: "DRIVER", info: "" }],
    }));
  };

  const updateMember = (i, field, value) => {
    const members = [...form.members];
    members[i][field] = value;
    setForm((p) => ({ ...p, members }));
  };

  const removeMember = (i) => {
    setForm((p) => ({
      ...p,
      members: p.members.filter((_, idx) => idx !== i),
    }));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.teamName.trim() || !form.ownerName.trim()) return;

    const payload = {
      teamName: form.teamName.trim(),

      bulls: form.bulls.map((b) => ({
        name: b.name.trim(),
        category: CATEGORY_MAP[b.categoryKey],
      })),

      teamMembers: [
        // OWNER (always exactly one)
        {
          name: form.ownerName.trim(),
          role: "OWNER",
        },

        // Other members
        ...form.members
          .filter((m) => m.name.trim())
          .map((m) => ({
            name: m.name.trim(),
            role: m.role,
            info: m.info.trim(),
          })),
      ],
    };

    onSubmit(payload);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Add Bull Team</h3>

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

        {/* Bulls */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-700 text-sm">
            Bulls ({form.bulls.length})
          </p>

          {form.bulls.map((bull, i) => (
            <div key={i} className="flex gap-3">
              <input
                placeholder="Bull Name"
                value={bull.name}
                onChange={(e) => handleBullChange(i, "name", e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />

              <select
                value={bull.categoryKey}
                onChange={(e) =>
                  handleBullChange(i, "categoryKey", e.target.value)
                }
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <optgroup label="Dentition">
                  <option value="milk_teeth">Milk Teeth</option>
                  <option value="two_teeth">Two Teeth</option>
                  <option value="four_teeth">Four Teeth</option>
                  <option value="six_teeth">Six Teeth</option>
                </optgroup>

                <optgroup label="Age Group">
                  <option value="sub_junior">Sub Junior</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                </optgroup>

                <optgroup label="Class">
                  <option value="general">General</option>
                  <option value="new">New</option>
                  <option value="old">Old</option>
                </optgroup>
              </select>
            </div>
          ))}

          <button
            type="button"
            onClick={addBull}
            className="text-sm text-orange-600 font-medium"
          >
            + Add Bull
          </button>
        </div>

        {/* Team Members */}
        <div className="space-y-2">
          <p className="font-semibold text-gray-700 text-sm">
            Team Members (excluding owner)
          </p>

          {form.members.map((m, i) => (
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
            className="px-5 py-2 rounded-lg bg-orange-600 text-white"
          >
            Save Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;

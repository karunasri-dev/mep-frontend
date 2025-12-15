import { useState } from "react";

const BullForm = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    teamName: "",
    ownerName: "",
    numberOfBulls: 1,
    bulls: [{ name: "", category: "senior" }],
    contact: "",
    totalMembers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleBullChange = (i, field, value) => {
    const bulls = [...form.bulls];
    bulls[i][field] = value;
    setForm((p) => ({ ...p, bulls }));
  };

  const addBull = () => {
    setForm((p) => ({
      ...p,
      bulls: [...p.bulls, { name: "", category: p.bulls[0].category }],
      numberOfBulls: p.bulls.length + 1,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.teamName.trim() || !form.ownerName.trim()) return;

    onSubmit(form);
  };

  return (
    <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6">
      <h3 className="text-xl font-bold mb-6 text-gray-800">Add Bull Team</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Team Info */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="teamName"
            placeholder="Team Name"
            value={form.teamName}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
          />
          <input
            name="ownerName"
            placeholder="Owner Name"
            value={form.ownerName}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="contact"
            placeholder="Contact"
            value={form.contact}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
          />
          <input
            name="totalMembers"
            placeholder="Total Members"
            value={form.totalMembers}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
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
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
              />
              <select
                value={bull.category}
                onChange={(e) =>
                  handleBullChange(i, "category", e.target.value)
                }
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="senior">Senior</option>
                <option value="junior">Junior</option>
              </select>
            </div>
          ))}

          <button
            type="button"
            onClick={addBull}
            className="text-sm text-orange-600 font-medium hover:underline"
          >
            + Add Bull
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

export default BullForm;

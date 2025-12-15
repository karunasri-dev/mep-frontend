import { useState } from "react";
import { motion } from "framer-motion";

export default function BullForm() {
  const [form, setForm] = useState({
    teamName: "",
    ownerName: "",
    numberOfBulls: "",
    bulls: [{ name: "", category: "senior" }],
    contact: "",
    totalMembers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBullChange = (index, field, value) => {
    const updated = [...form.bulls];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, bulls: updated }));
  };

  const addBull = () => {
    setForm((prev) => ({
      ...prev,
      bulls: [...prev.bulls, { name: "", category: "senior" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", form);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-2 text-gray-800">
        Add Bull Team Data
      </h2>

      {/* Team Name */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          name="teamName"
          value={form.teamName}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-black transition-all"
        />
      </div>

      {/* Owner Name */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700">Owner Name</label>
        <input
          type="text"
          name="ownerName"
          value={form.ownerName}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-black transition-all"
        />
      </div>

      {/* Number of Bulls */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700">Number of Bulls</label>
        <input
          type="number"
          name="numberOfBulls"
          value={form.numberOfBulls}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-black transition-all"
        />
      </div>

      {/* Bulls Section */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">Bulls</h3>

        {form.bulls.map((bull, i) => (
          <motion.div
            key={i}
            className="flex gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              placeholder="Bull Name"
              value={bull.name}
              onChange={(e) => handleBullChange(i, "name", e.target.value)}
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-black transition-all"
            />

            <select
              value={bull.category}
              onChange={(e) => handleBullChange(i, "category", e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-black transition-all"
            >
              <option value="senior">Senior</option>
              <option value="junior">Junior</option>
            </select>
          </motion.div>
        ))}

        <motion.button
          type="button"
          onClick={addBull}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="px-4 py-2 bg-gray-100 rounded-lg border hover:bg-gray-200 transition-all"
        >
          + Add Bull
        </motion.button>
      </div>

      {/* Contact */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700">Contact Details</label>
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-black transition-all"
        />
      </div>

      {/* Total Members */}
      <div className="flex flex-col">
        <label className="font-medium text-gray-700">Total Team Members</label>
        <input
          type="number"
          name="totalMembers"
          value={form.totalMembers}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-black transition-all"
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-black text-white py-3 rounded-lg font-semibold tracking-wide"
      >
        Submit
      </motion.button>
    </motion.form>
  );
}

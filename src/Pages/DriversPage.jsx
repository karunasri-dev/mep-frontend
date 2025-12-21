import React, { useState, useMemo, useEffect } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const DriversPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // ✅ Backend-shaped sample data
  const teams = [
    {
      teamName: "Thunder Bulls",
      bulls: [{ name: "Bull A" }, { name: "Bull B" }],
      teamMembers: [
        {
          name: "Rajesh Kumar",
          role: "OWNER",
          info: "Senior driver, 8 years experience",
        },
        {
          name: "Ravi",
          role: "DRIVER",
          info: "Junior driver, 2 years experience",
        },
      ],
    },
    {
      teamName: "Mighty Warriors",
      bulls: [{ name: "Bull X" }, { name: "Bull Y" }],
      teamMembers: [
        {
          name: "Krishna Murthy",
          role: "OWNER",
          info: "Senior driver, 8 years experience",
        },
        {
          name: "Manoj",
          role: "DRIVER",
          info: "Senior driver, 5 years experience",
        },
      ],
    },
    {
      teamName: "Power Bulls",
      bulls: [{ name: "Bull X" }],
      teamMembers: [
        { name: "Krishna Murthy", role: "OWNER", info: "Young Talent" },
        { name: "Suresh", role: "DRIVER" },
      ],
    },
  ];

  // ✅ Derive drivers from teams
  const allDrivers = useMemo(() => {
    return teams.flatMap((team) =>
      team.teamMembers
        .filter((m) => m.role === "DRIVER")
        .map((driver, index) => ({
          id: `${team.teamName}-${index}`,
          name: driver.name,
          team: team.teamName,
          bulls: team.bulls.map((b) => b.name).join(", "),
          info: driver.info || "",
          status: "Active",
        }))
    );
  }, [teams]);

  // 🔍 Search
  const filteredDrivers = useMemo(() => {
    return allDrivers.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.bulls.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allDrivers]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredDrivers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentDrivers = filteredDrivers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Drivers</h1>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Search driver, team, bull..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Driver Name</th>
                <th className="px-4 py-3 text-left">Team</th>
                <th className="px-4 py-3 text-left">Bulls</th>
                <th className="px-4 py-3 text-left">Info</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {currentDrivers.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3 font-medium">{d.name}</td>
                  <td className="px-4 py-3">{d.team}</td>
                  <td className="px-4 py-3">{d.bulls}</td>
                  <td className="px-4 py-3">{d.info || "-"}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}

              {currentDrivers.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriversPage;
